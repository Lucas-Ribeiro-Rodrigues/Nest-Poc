import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {

  @PrimaryGeneratedColumn({ name: "ID_BD" })
  id: number;
  
  @Column({ name: "FIRST_NAME" })
  firstName: string;
  
  @Column({name: "LAST_NAME" })
  lastName: string;
  
  @Column({ name: "IS_ACTIVE", default: true })
  isActive: boolean;
  
  static fromAttributes(firstName: string, lastName: string, isActive: boolean) {
    let user = new User();

    user.firstName = firstName;
    user.lastName = lastName;
    user.isActive = isActive;

    return user;
  }

}