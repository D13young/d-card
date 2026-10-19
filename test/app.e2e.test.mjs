import assert from 'node:assert/strict';
import { after, before, test } from 'node:test';
import { NestFactory } from '@nestjs/core';
import { AppModule } from '../dist/app.module.js';

let app;
let baseUrl;

before(async () => {
  app = await NestFactory.create(AppModule, { logger: false });
  await app.listen(0);
  baseUrl = await app.getUrl();
});

after(async () => {
  await app.close();
});

async function graphql(query) {
  const response = await fetch(`${baseUrl}/graphql`, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ query }),
  });
  assert.equal(response.status, 200);
  return response.json();
}

test('profile query returns nested card data', async () => {
  const body = await graphql(`
    query {
      profile {
        name
        description
        skills {
          name
        }
        experience {
          company
          position
          duration
          achievements {
            text
          }
        }
        projects {
          name
          url
        }
      }
    }
  `);
  assert.equal(body.errors, undefined);
  const profile = body.data.profile;
  assert.equal(profile.name, 'Косиненко Сергей Александрович');
  assert.ok(profile.description.length > 0);
  assert.equal(profile.skills.length, 20);
  assert.equal(profile.experience.length, 3);
  assert.equal(profile.projects.length, 4);
  assert.ok(profile.experience[0].duration.length > 0);
  assert.ok(
    profile.experience.every((item) => item.achievements.length > 0),
  );
  assert.ok(profile.projects.every((project) => project.url.length > 0));
});

test('health query and skills filter work', async () => {
  const health = await graphql('{ health }');
  assert.equal(health.data.health, 'ok');

  const skills = await graphql(
    'query { skills(filter: { category: "Backend" }) { name category } }',
  );
  assert.equal(skills.data.skills.length, 5);
  assert.ok(
    skills.data.skills.every((skill) => skill.category === 'Backend'),
  );
});
