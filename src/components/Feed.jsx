import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import { BASE_URL } from '../utils/constants';
import { addFeed } from '../utils/feedSlice';
import { useEffect } from 'react';
import UserCard from './UserCard';

const Feed = () => {
    const feed = useSelector((store) => store.feed);
    const dispatch = useDispatch();

    const getFeed =  async () => {
      if(feed) return;
      try{
        const res = await axios.get(BASE_URL + '/user/feed', {withCredentials: true});
        dispatch(addFeed(res.data));
      }catch(err){
        console.log(err);
      }
    }

    useEffect(() => {
      getFeed();
    }, []);

    return (
      feed && (
      <div className='flex justify-center mt-10 mb-20'>
        <UserCard user={feed[0]}/>
      </div>
    ))
}

export default Feed;