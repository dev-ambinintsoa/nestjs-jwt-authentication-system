import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { UserRole } from '../../users/entities/user-role.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class SeederService {
  constructor(
    @InjectRepository(UserRole)
    private readonly roleTypeRepository: Repository<UserRole>,
  ) {}
  async seed() {
    await this.seedRole();
    console.log(
      '======================= Seeding completed =======================',
    );
  }

  private async seedRole() {
    const roles = [
      { name: 'Admin', description: '...', code: '654NGHE' },
      { name: 'User', description: '...', code: '678AMSX' },
    ];

    for (const role of roles) {
      const existingRole = await this.roleTypeRepository.findOne({
        where: { name: role.name },
      });
      if (!existingRole) {
        const newRole = this.roleTypeRepository.create(role);
        await this.roleTypeRepository.save(newRole);
      }
    }
  }
}
