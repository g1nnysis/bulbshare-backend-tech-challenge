import { MigrationInterface, QueryRunner } from 'typeorm'

export class InitialSchema1696871362358 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
		CREATE TABLE user (
			id INT AUTO_INCREMENT PRIMARY KEY,
			age INT NOT NULL,
			gender VARCHAR(255) NOT NULL,
			country_id INT NOT NULL
		);
	`)

    await queryRunner.query(`
		CREATE TABLE brief (
		id INT AUTO_INCREMENT PRIMARY KEY,
		parent_brief_id INT
		);
	`)

    await queryRunner.query(`
		CREATE TABLE poll_item (
		id INT AUTO_INCREMENT PRIMARY KEY,
		brief_id INT NOT NULL,
		type ENUM('swipe', 'radio', 'multichoice', 'opentext') NOT NULL DEFAULT 'opentext',
		question TEXT NOT NULL
		);
	`)

    await queryRunner.query(`
		CREATE TABLE poll_response_option (
			id INT AUTO_INCREMENT PRIMARY KEY,
			poll_item_id INT NOT NULL,
			option_value VARCHAR(255) NOT NULL,
			content VARCHAR(255) NOT NULL
		);`)

    await queryRunner.query(`
		CREATE TABLE poll_response (
			id INT AUTO_INCREMENT PRIMARY KEY,
			user_id INT NOT NULL,
			poll_item_id INT NOT NULL,
			content VARCHAR(255),
			response_option_id INT,
			start_time TIMESTAMP NOT NULL,
			end_time TIMESTAMP NOT NULL
		);
	`)

    await queryRunner.query(`ALTER TABLE poll_item ADD CONSTRAINT fk_brief_id FOREIGN KEY (brief_id) REFERENCES brief(id);`)
    await queryRunner.query(`ALTER TABLE poll_response_option ADD CONSTRAINT fk_option_poll_item_id FOREIGN KEY (poll_item_id) REFERENCES poll_item(id);`)
    await queryRunner.query(`ALTER TABLE poll_response ADD CONSTRAINT fk_user_id FOREIGN KEY (user_id) REFERENCES user(id);`)
    await queryRunner.query(`ALTER TABLE poll_response ADD CONSTRAINT fk_poll_item_id FOREIGN KEY (poll_item_id) REFERENCES poll_item(id);`)
    await queryRunner.query(
      `ALTER TABLE poll_response ADD CONSTRAINT fk_response_option_id FOREIGN KEY (response_option_id) REFERENCES poll_response_option(id);`
    )
    await queryRunner.query(`ALTER TABLE brief ADD CONSTRAINT fk_parent_brief_id FOREIGN KEY (parent_brief_id) REFERENCES brief(id);`)
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE poll_response_option DROP FOREIGN KEY fk_option_poll_item_id`)
    await queryRunner.query(`ALTER TABLE poll_response DROP FOREIGN KEY fk_user_id`)
    await queryRunner.query(`ALTER TABLE poll_response DROP FOREIGN KEY fk_poll_item_id`)
    await queryRunner.query(`ALTER TABLE poll_response DROP FOREIGN KEY fk_response_option_id`)
    await queryRunner.query(`ALTER TABLE poll_item DROP FOREIGN KEY fk_brief_id`)
    await queryRunner.query(`ALTER TABLE brief DROP FOREIGN KEY fk_channel_id`)
    await queryRunner.query(`ALTER TABLE brief DROP FOREIGN KEY fk_parent_brief_id`)

    await queryRunner.query(`DROP TABLE poll_response`)
    await queryRunner.query(`DROP TABLE poll_item`)
    await queryRunner.query(`DROP TABLE brief`)
    await queryRunner.query(`DROP TABLE user`)
  }
}
