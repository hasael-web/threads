import { hashSync, compare } from "bcrypt";

const hashPassword = (password: string, saltRounds: number) => {
  const passwordHash = hashSync(password, saltRounds);
  return { passwordHash };
};

const chekPassword = async (pi: string, pd: string) => {
  if (pi && pd) {
    const chekPassword = await compare(pi, pd);
    return chekPassword;
  }
};

export { hashPassword, chekPassword };
