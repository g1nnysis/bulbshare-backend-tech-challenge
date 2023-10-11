import { v4 } from 'uuid'
import * as _ from 'lodash'
import { QueryRunner } from 'typeorm'

export function mockObject<T, D extends Partial<T> = Partial<T>>(defaults?: D): T {
  return forceMockObject(defaults ?? {})
}

export function forceMockObject<T>(defaults: unknown): T {
  if (_.isEmpty(defaults)) {
    return <T>(<unknown>{ __mock_id: v4() })
  }

  return <T>defaults
}

export async function clearDatabase(queryRunner: QueryRunner): Promise<void> {
  await dropFKeys(queryRunner)
  await queryRunner.query(`TRUNCATE poll_item;`)
  await queryRunner.query(`TRUNCATE poll_response_option;`)
  await queryRunner.query(`TRUNCATE poll_response;`)
  await queryRunner.query(`TRUNCATE user;`)
  await queryRunner.query(`TRUNCATE brief;`)
  await recreateFKeys(queryRunner)
}

async function dropFKeys(queryRunner: QueryRunner): Promise<void> {
  await queryRunner.query(`ALTER TABLE poll_response_option DROP FOREIGN KEY fk_option_poll_item_id;`)
  await queryRunner.query(`ALTER TABLE poll_response DROP FOREIGN KEY fk_user_id;`)
  await queryRunner.query(`ALTER TABLE poll_response DROP FOREIGN KEY fk_poll_item_id;`)
  await queryRunner.query(`ALTER TABLE poll_response DROP FOREIGN KEY fk_response_option_id;`)
  await queryRunner.query(`ALTER TABLE poll_item DROP FOREIGN KEY fk_brief_id;`)
  await queryRunner.query(`ALTER TABLE brief DROP FOREIGN KEY fk_parent_brief_id;`)
}

async function recreateFKeys(queryRunner: QueryRunner): Promise<void> {
  await queryRunner.query(`ALTER TABLE poll_item ADD CONSTRAINT fk_brief_id FOREIGN KEY (brief_id) REFERENCES brief(id);`)
  await queryRunner.query(`ALTER TABLE poll_response_option ADD CONSTRAINT fk_option_poll_item_id FOREIGN KEY (poll_item_id) REFERENCES poll_item(id);`)
  await queryRunner.query(`ALTER TABLE poll_response ADD CONSTRAINT fk_user_id FOREIGN KEY (user_id) REFERENCES user(id);`)
  await queryRunner.query(`ALTER TABLE poll_response ADD CONSTRAINT fk_poll_item_id FOREIGN KEY (poll_item_id) REFERENCES poll_item(id);`)
  await queryRunner.query(
    `ALTER TABLE poll_response ADD CONSTRAINT fk_response_option_id FOREIGN KEY (response_option_id) REFERENCES poll_response_option(id);`
  )
  await queryRunner.query(`ALTER TABLE brief ADD CONSTRAINT fk_parent_brief_id FOREIGN KEY (parent_brief_id) REFERENCES brief(id);`)
}
