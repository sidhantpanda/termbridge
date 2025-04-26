import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class ConnectConfigEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: 'varchar', nullable: true })
    name: string;
    
    @Column({ type: 'varchar', nullable: true })
    host: string;

    @Column({ type: 'int', nullable: true })
    port: number;

    @Column({ type: 'boolean', nullable: true })
    forceIPv4: boolean;

    @Column({ type: 'boolean', nullable: true })
    forceIPv6: boolean;

    @Column({ type: 'varchar', nullable: true })
    hostHash: string;

    @Column({ type: 'varchar', nullable: true })
    username: string;

    @Column({ type: 'varchar', nullable: true })
    password: string;

    @Column({ type: 'varchar', nullable: true })
    agent: string;

    @Column({ type: 'text', nullable: true })
    privateKey: string;

    @Column({ type: 'text', nullable: true })
    passphrase: string;

    @Column({ type: 'varchar', nullable: true })
    localHostname: string;

    @Column({ type: 'varchar', nullable: true })
    localUsername: string;

    @Column({ type: 'boolean', nullable: true })
    tryKeyboard: boolean;

    @Column({ type: 'int', nullable: true })
    keepaliveInterval: number;

    @Column({ type: 'int', nullable: true })
    keepaliveCountMax: number;

    @Column({ type: 'int', nullable: true })
    readyTimeout: number;

    @Column({ type: 'boolean', nullable: true })
    strictVendor: boolean;

    @Column({ type: 'boolean', nullable: true })
    agentForward: boolean;

    @Column({ type: 'json', nullable: true })
    algorithms: any;

    @Column({ type: 'varchar', nullable: true })
    localAddress: string;

    @Column({ type: 'int', nullable: true })
    localPort: number;

    @Column({ type: 'int', nullable: true })
    timeout: number;

    @Column({ type: 'text', nullable: true })
    ident: string;
}
