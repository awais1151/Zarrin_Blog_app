'use client'
import Comments from '@/Components/Comments/Comments';
import Email from '@/Components/Emailbox/Email';
import useBlogStore from '@/zustand/blog.zustand';
import { ReactionBarSelector } from '@charkour/react-reactions';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

const SingleBlog = ({params: {id}}: { params: { id: string } }) => {
 

  const router = useRouter();
  const { getSingleBlog, singleBlog, giveReaction } = useBlogStore();
  const [reactionCounts, setReactionCounts] = useState({
    happy: 0,
    satisfaction: 0,
    sad: 0,
    love: 0,
    surprise: 0,
    angry: 0,
  });
  const [userReaction, setUserReaction] = useState<string | null>(null);
  const [selectedReaction, setSelectedReaction] = useState<string | null>(userReaction);

  useEffect(() => {
    const fetchData = async () => {
      const counts: any = await getSingleBlog(id);
      setUserReaction(counts?.userReaction?.reactionType);
      setReactionCounts({
        happy: counts?.reactionCounts?.happy || 0,
        satisfaction: counts?.reactionCounts?.satisfaction || 0,
        sad: counts?.reactionCounts?.sad || 0,
        love: counts?.reactionCounts?.love || 0,
        surprise: counts?.reactionCounts?.surprise || 0,
        angry: counts?.reactionCounts?.angry || 0,
      });
    };

    fetchData(); 
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const handleReaction = async (key: string) => {
    try {
      if (userReaction === key) {
        // If user removes the reaction
        await giveReaction(key, id);
        setUserReaction(null);
        setReactionCounts((prevCounts: any) => ({
          ...prevCounts,
          [key]: prevCounts[key] - 1,
        }));
      } else {
        // If user adds a new reaction or changes existing reaction
        await giveReaction(key, id);
        setUserReaction(key);
        setReactionCounts((prevCounts: any) => ({
          ...prevCounts,
          [key]: prevCounts[key] + 1,
        }));
        if (userReaction) {
          // If user changes existing reaction
          setReactionCounts((prevCounts: any) => ({
            ...prevCounts,
            [userReaction]: prevCounts[userReaction] - 1,
          }));
        }
      }
    } catch (error) {
      console.error('Error handling reaction:', error);
    }
  };

  if (!singleBlog) {
    return <p>Loading....</p>;
  }
  
  return (
    <div> 
      
      <div className='flex flex-col justify-center items-center min-h-screen '>
        <div className='max-w-[50%] flex flex-col justify-center items-center gap-5  '>
          <div className='text-3xl font-semibold'>{singleBlog.title}</div>
          <div className='max-w-full flex justify-center '>
            <img src={singleBlog.image} alt="Blog Image" className='max-h-96 hover:scale-105'/>
          </div>
          <div><p>{singleBlog.content}</p></div>
          <div>Category: {singleBlog.category?.title}</div>
        </div>
        <div>
        <ReactionBarSelector 
  style={{  padding: '10px', border: '2px solid #ffffff' }} 
  iconSize={25} 
  onSelect={(key: string) => {
    handleReaction(key);
    setSelectedReaction(key);
  }} 
/>
        </div>
        <div className='flex flex-wrap space-x-3'>
            {reactionCounts.happy > 0 && <span className='flex flex-col items-center'><span>😆</span> {reactionCounts.happy}</span>}
            {reactionCounts.satisfaction > 0 && <span className='flex flex-col items-center'><span>👍</span>{reactionCounts.satisfaction}</span>}
            {reactionCounts.sad > 0 && <span className='flex flex-col items-center'><span>😢</span>{reactionCounts.sad}</span>}
            {reactionCounts.love > 0 && <span className='flex flex-col items-center'><span>❤️</span> {reactionCounts.love}</span>}
            {reactionCounts.surprise > 0 && <span className='flex flex-col items-center'><span>😮</span> {reactionCounts.surprise}</span>}
            {reactionCounts.angry > 0 && <span className='flex flex-col items-center'><span>😡</span> {reactionCounts.angry}</span>}
          </div>
        <Comments id={singleBlog._id}/>
      </div>
      <Email/>
      {/* <Footer/> */}
    </div>
  );
};

export default SingleBlog;
