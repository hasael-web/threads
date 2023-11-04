import { MigrationInterface, QueryRunner } from "typeorm";

export class ThreadsMigration1698822293071 implements MigrationInterface {
    name = 'ThreadsMigration1698822293071'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`replies\` (\`id\` int NOT NULL AUTO_INCREMENT, \`image\` varchar(255) NULL, \`content\` varchar(255) NOT NULL, \`created_at\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, \`update_at\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, \`userIdId\` int NULL, \`threadIdId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`threads\` (\`id\` int NOT NULL AUTO_INCREMENT, \`content\` varchar(255) NOT NULL, \`image\` varchar(255) NULL, \`created_at\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, \`update_at\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, \`createById\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`following\` (\`id\` int NOT NULL AUTO_INCREMENT, \`created_at\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, \`update_at\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, \`followingIdId\` int NULL, \`followerIdId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`user\` (\`id\` int NOT NULL AUTO_INCREMENT, \`username\` varchar(255) NOT NULL, \`full_name\` varchar(255) NOT NULL, \`email\` varchar(255) NOT NULL, \`password\` varchar(255) NOT NULL, \`photo_profile\` varchar(255) NULL, \`bio\` varchar(255) NOT NULL, \`created_at\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, \`update_at\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`likes\` (\`id\` int NOT NULL AUTO_INCREMENT, \`isLike\` tinyint NOT NULL, \`created_at\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, \`update_at\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, \`userIdId\` int NULL, \`threadIdId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`replies\` ADD CONSTRAINT \`FK_829fabbd5394610739e5bb6746f\` FOREIGN KEY (\`userIdId\`) REFERENCES \`user\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`replies\` ADD CONSTRAINT \`FK_24ad14188b37dcd8686bf0d3862\` FOREIGN KEY (\`threadIdId\`) REFERENCES \`threads\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`threads\` ADD CONSTRAINT \`FK_7ae960c0f11a3e8425f60ed860b\` FOREIGN KEY (\`createById\`) REFERENCES \`user\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`following\` ADD CONSTRAINT \`FK_3222246b2ad81e4873958f7aaff\` FOREIGN KEY (\`followingIdId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`following\` ADD CONSTRAINT \`FK_e2ea36410efcf585a78eb658786\` FOREIGN KEY (\`followerIdId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`likes\` ADD CONSTRAINT \`FK_314680784cc4ba14bf392fbb873\` FOREIGN KEY (\`userIdId\`) REFERENCES \`user\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`likes\` ADD CONSTRAINT \`FK_cc28874faae9823b38853f20823\` FOREIGN KEY (\`threadIdId\`) REFERENCES \`threads\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`likes\` DROP FOREIGN KEY \`FK_cc28874faae9823b38853f20823\``);
        await queryRunner.query(`ALTER TABLE \`likes\` DROP FOREIGN KEY \`FK_314680784cc4ba14bf392fbb873\``);
        await queryRunner.query(`ALTER TABLE \`following\` DROP FOREIGN KEY \`FK_e2ea36410efcf585a78eb658786\``);
        await queryRunner.query(`ALTER TABLE \`following\` DROP FOREIGN KEY \`FK_3222246b2ad81e4873958f7aaff\``);
        await queryRunner.query(`ALTER TABLE \`threads\` DROP FOREIGN KEY \`FK_7ae960c0f11a3e8425f60ed860b\``);
        await queryRunner.query(`ALTER TABLE \`replies\` DROP FOREIGN KEY \`FK_24ad14188b37dcd8686bf0d3862\``);
        await queryRunner.query(`ALTER TABLE \`replies\` DROP FOREIGN KEY \`FK_829fabbd5394610739e5bb6746f\``);
        await queryRunner.query(`DROP TABLE \`likes\``);
        await queryRunner.query(`DROP TABLE \`user\``);
        await queryRunner.query(`DROP TABLE \`following\``);
        await queryRunner.query(`DROP TABLE \`threads\``);
        await queryRunner.query(`DROP TABLE \`replies\``);
    }

}
