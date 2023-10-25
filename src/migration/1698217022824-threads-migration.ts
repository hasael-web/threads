import { MigrationInterface, QueryRunner } from "typeorm";

export class ThreadsMigration1698217022824 implements MigrationInterface {
    name = 'ThreadsMigration1698217022824'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX \`FK_829fabbd5394610739e5bb6746f\` ON \`replies\``);
        await queryRunner.query(`DROP INDEX \`FK_24ad14188b37dcd8686bf0d3862\` ON \`replies\``);
        await queryRunner.query(`DROP INDEX \`FK_7ae960c0f11a3e8425f60ed860b\` ON \`threads\``);
        await queryRunner.query(`DROP INDEX \`FK_3222246b2ad81e4873958f7aaff\` ON \`following\``);
        await queryRunner.query(`DROP INDEX \`FK_e2ea36410efcf585a78eb658786\` ON \`following\``);
        await queryRunner.query(`ALTER TABLE \`likes\` ADD \`userIdId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`replies\` CHANGE \`image\` \`image\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`replies\` CHANGE \`created_at\` \`created_at\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE \`replies\` CHANGE \`update_at\` \`update_at\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE \`replies\` CHANGE \`userIdId\` \`userIdId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`replies\` CHANGE \`threadIdId\` \`threadIdId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`threads\` CHANGE \`image\` \`image\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`threads\` CHANGE \`created_at\` \`created_at\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE \`threads\` CHANGE \`update_at\` \`update_at\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE \`threads\` CHANGE \`createById\` \`createById\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`created_at\` \`created_at\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`update_at\` \`update_at\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE \`following\` CHANGE \`created_at\` \`created_at\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE \`following\` CHANGE \`update_at\` \`update_at\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE \`following\` CHANGE \`followingIdId\` \`followingIdId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`following\` CHANGE \`followerIdId\` \`followerIdId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`likes\` DROP FOREIGN KEY \`FK_cc28874faae9823b38853f20823\``);
        await queryRunner.query(`ALTER TABLE \`likes\` CHANGE \`created_at\` \`created_at\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE \`likes\` CHANGE \`update_at\` \`update_at\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE \`likes\` CHANGE \`threadIdId\` \`threadIdId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`replies\` ADD CONSTRAINT \`FK_829fabbd5394610739e5bb6746f\` FOREIGN KEY (\`userIdId\`) REFERENCES \`user\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`replies\` ADD CONSTRAINT \`FK_24ad14188b37dcd8686bf0d3862\` FOREIGN KEY (\`threadIdId\`) REFERENCES \`threads\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`threads\` ADD CONSTRAINT \`FK_7ae960c0f11a3e8425f60ed860b\` FOREIGN KEY (\`createById\`) REFERENCES \`user\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`following\` ADD CONSTRAINT \`FK_3222246b2ad81e4873958f7aaff\` FOREIGN KEY (\`followingIdId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`following\` ADD CONSTRAINT \`FK_e2ea36410efcf585a78eb658786\` FOREIGN KEY (\`followerIdId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`likes\` ADD CONSTRAINT \`FK_314680784cc4ba14bf392fbb873\` FOREIGN KEY (\`userIdId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`likes\` ADD CONSTRAINT \`FK_cc28874faae9823b38853f20823\` FOREIGN KEY (\`threadIdId\`) REFERENCES \`threads\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`likes\` DROP FOREIGN KEY \`FK_cc28874faae9823b38853f20823\``);
        await queryRunner.query(`ALTER TABLE \`likes\` DROP FOREIGN KEY \`FK_314680784cc4ba14bf392fbb873\``);
        await queryRunner.query(`ALTER TABLE \`following\` DROP FOREIGN KEY \`FK_e2ea36410efcf585a78eb658786\``);
        await queryRunner.query(`ALTER TABLE \`following\` DROP FOREIGN KEY \`FK_3222246b2ad81e4873958f7aaff\``);
        await queryRunner.query(`ALTER TABLE \`threads\` DROP FOREIGN KEY \`FK_7ae960c0f11a3e8425f60ed860b\``);
        await queryRunner.query(`ALTER TABLE \`replies\` DROP FOREIGN KEY \`FK_24ad14188b37dcd8686bf0d3862\``);
        await queryRunner.query(`ALTER TABLE \`replies\` DROP FOREIGN KEY \`FK_829fabbd5394610739e5bb6746f\``);
        await queryRunner.query(`ALTER TABLE \`likes\` CHANGE \`threadIdId\` \`threadIdId\` int NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`likes\` CHANGE \`update_at\` \`update_at\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP()`);
        await queryRunner.query(`ALTER TABLE \`likes\` CHANGE \`created_at\` \`created_at\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP()`);
        await queryRunner.query(`ALTER TABLE \`likes\` ADD CONSTRAINT \`FK_cc28874faae9823b38853f20823\` FOREIGN KEY (\`threadIdId\`) REFERENCES \`threads\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`following\` CHANGE \`followerIdId\` \`followerIdId\` int NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`following\` CHANGE \`followingIdId\` \`followingIdId\` int NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`following\` CHANGE \`update_at\` \`update_at\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP()`);
        await queryRunner.query(`ALTER TABLE \`following\` CHANGE \`created_at\` \`created_at\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP()`);
        await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`update_at\` \`update_at\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP()`);
        await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`created_at\` \`created_at\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP()`);
        await queryRunner.query(`ALTER TABLE \`threads\` CHANGE \`createById\` \`createById\` int NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`threads\` CHANGE \`update_at\` \`update_at\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP()`);
        await queryRunner.query(`ALTER TABLE \`threads\` CHANGE \`created_at\` \`created_at\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP()`);
        await queryRunner.query(`ALTER TABLE \`threads\` CHANGE \`image\` \`image\` varchar(255) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`replies\` CHANGE \`threadIdId\` \`threadIdId\` int NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`replies\` CHANGE \`userIdId\` \`userIdId\` int NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`replies\` CHANGE \`update_at\` \`update_at\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP()`);
        await queryRunner.query(`ALTER TABLE \`replies\` CHANGE \`created_at\` \`created_at\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP()`);
        await queryRunner.query(`ALTER TABLE \`replies\` CHANGE \`image\` \`image\` varchar(255) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`likes\` DROP COLUMN \`userIdId\``);
        await queryRunner.query(`CREATE INDEX \`FK_e2ea36410efcf585a78eb658786\` ON \`following\` (\`followerIdId\`)`);
        await queryRunner.query(`CREATE INDEX \`FK_3222246b2ad81e4873958f7aaff\` ON \`following\` (\`followingIdId\`)`);
        await queryRunner.query(`CREATE INDEX \`FK_7ae960c0f11a3e8425f60ed860b\` ON \`threads\` (\`createById\`)`);
        await queryRunner.query(`CREATE INDEX \`FK_24ad14188b37dcd8686bf0d3862\` ON \`replies\` (\`threadIdId\`)`);
        await queryRunner.query(`CREATE INDEX \`FK_829fabbd5394610739e5bb6746f\` ON \`replies\` (\`userIdId\`)`);
    }

}
