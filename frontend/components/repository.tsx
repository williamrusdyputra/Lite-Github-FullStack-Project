import axios from 'axios';
import { getSession } from 'next-auth/react';
import { useEffect, useState } from 'react';

const backendURL = process.env.BACKEND_URL;

const Repository = () => {
  interface IRepo {
    name: string;
    visibility: string;
    description: string;
    language: string;
    updatedAt: string;
  }

  const [repos, setRepos] = useState<IRepo[]>([
    {
      name: 'pixel8Labs-api-1',
      visibility: 'public',
      description: 'Awesome Api from us for general development (all-at-once)',
      language: 'Ruby',
      updatedAt: 'just now',
    },
    {
      name: 'pixel8Labs-api-2',
      visibility: 'public',
      description: 'Awesome Api from us for general development (all-at-once)',
      language: 'Ruby',
      updatedAt: 'just now',
    },
    {
      name: 'pixel8Labs-api-3',
      visibility: 'public',
      description: 'Awesome Api from us for general development (all-at-once)',
      language: 'Ruby',
      updatedAt: 'just now',
    },
    {
      name: 'pixel8Labs-api-4',
      visibility: 'public',
      description: 'Awesome Api from us for general development (all-at-once)',
      language: 'Ruby',
      updatedAt: 'just now',
    },
    {
      name: 'pixel8Labs-api-5',
      visibility: 'public',
      description: 'Awesome Api from us for general development (all-at-once)',
      language: 'Ruby',
      updatedAt: 'just now',
    },
    {
      name: 'pixel8Labs-api-6',
      visibility: 'public',
      description: 'Awesome Api from us for general development (all-at-once)',
      language: 'Ruby',
      updatedAt: 'just now',
    },
  ]);

  useEffect(() => {
    const checkSession = async () => {
      const session = await getSession();
      if (session) {
        const response = await axios.get(backendURL + '/api/v1/github/repos', {
          params: {
            username: session.git_username,
            access_token: session.access_token,
          },
        });

        setRepos([]);
        const newRepos: IRepo[] = response.data.data.map((repo: any) => ({
          name: repo.name,
          visibility: repo.visibility,
          description: repo.description,
          language: repo.language ? repo.language : 'default',
          updatedAt: repo.updated_at,
        }));

        setRepos(newRepos);
      }
    };

    checkSession();
  }, []);

  const Repository: React.FC<{ repository: IRepo }> = ({ repository }) => {
    return (
      <div className="my-2">
        <button className="block w-full p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
          <div className="flex">
            <span className="pr-4 font-bold">{repository.name}</span>
            <span className="p-1.5 rounded-xl text-xs font-bold bg-vs-public text-vs-public-text">
              {repository.visibility}
            </span>
          </div>
          <div className="pt-2 text-start">
            <p>{repository.description}</p>
          </div>
          <div className="pt-4 flex items-center">
            <span className="mr-2 w-2 h-2 bg-red-500 rounded-full"></span>
            <span className="mr-8 text-xs font-bold">
              {repository.language}
            </span>
            <span className="text-xs text-gray-500">
              updated {repository.updatedAt}
            </span>
          </div>
        </button>
      </div>
    );
  };

  return (
    <div className="lg:w-3/4 text-center lg:ml-8 lg:mt-0 mt-8 p-4 border">
      <div className="flex mb-6">
        <span className="font-bold text-2xl mr-4">Repository</span>
        <span className="text-2xl">{repos.length}</span>
      </div>
      <div>
        {repos.map((repository) => (
          <Repository key={repository.name} repository={repository} />
        ))}
      </div>
    </div>
  );
};

export default Repository;
