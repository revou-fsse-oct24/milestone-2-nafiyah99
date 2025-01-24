import { useRouter } from 'next/router';

const Index = () => {
  const {query} = useRouter();

  return (
    <div>
      <h1>user ini adalah user dengan id {query.userId}</h1>
    </div>
  );
};

export default Index;
