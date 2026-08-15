import './Lesson07Styles.css';
import { useEffect, useState } from 'react';
import { getPosts } from './api.js';

export default function FetchOnRender() {
  const [data, setData] = useState();
  const [error, setError] = useState('');

  useEffect(() => {
    const gatherInfo = async () => {
      try {
        setData(await getPosts());
      } catch (err) {
        setError(err);
      }
    };

    gatherInfo();
  }, []);

  let display;
  if (error) {
    display = <p>{error.message}</p>;
  } else if (data) {
    console.log('data: ', data);
    display = data.map((info, ind) => {
      return (
        <div key={ind}>
          <h2>{info.title}</h2>
          <p>{info.body}</p>
        </div>
      );
    });
  }

  return (
    <div className="root">
      <h1 className="heading">Fetch list of posts on render</h1>
      <div className="content">{display}</div>
    </div>
  );
}
