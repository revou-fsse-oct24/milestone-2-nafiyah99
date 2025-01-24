import { useRouter } from 'next/router';
import Link from 'next/link';

const User = () => {
  const route = useRouter();
  return (
    <div>
      <h1>ini user aja, yang ke {route.query.id}</h1>
      <Link href="/blog/100/username/10">Menuju apah? uname 10 sih</Link>
      <br />
      <Link href={`/blog/${route.query.id}/username/120`}>username 120</Link>
    </div>
  );
};

export default User;
