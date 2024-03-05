import React, { ChangeEvent, useState } from 'react';
import { PencilSquareIcon, TrashIcon } from '@heroicons/react/24/outline';
import useBlogStore from '@/zustand/blog.zustand';
import { useRouter } from 'next/navigation';
interface IComment {
    id: string;
}

interface CommentItemProps {
    text: any;
}

const CommentItem: React.FC<CommentItemProps> = ({ text }) => {
    const { singleBlog, deleteComment, updateComment } = useBlogStore();
    const [isEditing, setIsEditing] = useState(false);
    const [editedComment, setEditedComment] = useState(text.comment);


    const handleDelete = () => {
        const commentId = text?._id ?? '';
        const blogId = singleBlog?._id ?? '';
        deleteComment(commentId, blogId);
    };

    const handleEdit = () => {
        setIsEditing(true);
        setEditedComment(text.comment)
    };

    const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        setEditedComment(e.target.value);
    };

    const handleSubmit = () => {
        const commentId = text?._id ?? '';
        const blogId = singleBlog?._id ?? '';
        console.log(editedComment);

        updateComment(commentId, blogId, editedComment);
        setIsEditing(false);
    };

    return (
        <div className="bg-white border border-slate-200 grid grid-cols-6 gap-2 mt-5 rounded-xl p-2 text-sm">
            {isEditing ? (
                <textarea
                    className="col-span-6 bg-[#F9FBFF] text-slate-600 h-28 placeholder:text-slate-600 placeholder:opacity-50 border border-slate-200 resize-none outline-none rounded-lg p-2 duration-300 focus:border-dashed"
                    value={editedComment}
                    onChange={handleChange}
                ></textarea>
            ) : (
                <p className="text-center text-slate-500 text-xl font-bold col-span-6">{text?.comment}</p>
            )}
            <p className="col-span-6">{text?.user?.name}</p>
            {isEditing ? (
                <>
                    <button onClick={handleSubmit}>Save</button>
                    <button onClick={() => setIsEditing(false)}>Cancel</button>
                </>
            ) : (
                <>
                    <span onClick={handleEdit} className="cursor-pointer hover:text-green-500">
                        <PencilSquareIcon className="w-4 h-4" />
                    </span>
                    <span onClick={handleDelete} className="cursor-pointer hover:text-red-500">
                        <TrashIcon className="w-4 h-4" />
                    </span>
                </>
            )}
        </div>
    );
};

const Comments = ({ id }: IComment) => {
    const router = useRouter()
    const [commentData, setcommentData] = useState({
        comment: ''
    });
    const { createComment, singleBlog } = useBlogStore();

    const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        e.preventDefault();
        setcommentData({ ...commentData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: ChangeEvent<HTMLFormElement>) => {
        e.preventDefault();

        let userToken: any = localStorage.getItem('Auth'); // Assuming the token is stored as 'token' in localStorage
        userToken = JSON.parse(userToken)
        console.log(userToken?.state?.isLoggedin)
        if (!userToken?.state?.isLoggedin) {
            router.push('/auth/signup');
            return;
        }
        else {

            if (!commentData.comment.trim()) return;
            await createComment(id, commentData);
            setcommentData({ comment: '' });
        }
    };

    return (
        <div>
            <form className="max-w-[500px]" onSubmit={handleSubmit}>
                <p className="text-[#8097B9] text-3xl font-bold">Leave a Comment</p>
                <div className="bg-white border border-slate-200 grid grid-cols-6 gap-2 mt-5 rounded-xl p-2 text-sm">
                    <h1 className="text-center text-slate-500 text-xl font-bold col-span-6">Give Comment!</h1>
                    <textarea
                        placeholder="Your feedback..."
                        name="comment"
                        value={commentData.comment}
                        onChange={handleChange}
                        className="bg-[#F9FBFF] text-slate-600 h-28 placeholder:text-slate-600 placeholder:opacity-50 border border-slate-200 col-span-6 resize-none outline-none rounded-lg p-2 duration-300 focus:border-dashed"
                    ></textarea>
                    <span className="col-span-2"></span>
                    <button
                        type="submit"
                        className="bg-[#F9FBFF] stroke-slate-600 border border-slate-200 col-span-2 flex justify-center rounded-lg p-2 duration-300 hover:border-[#F9FBFF] hover:text-white focus:stroke-blue-200 focus:bg-[#E8EDF5]"
                    >
                        Submit
                    </button>
                </div>
            </form>
            <div>
                <p className="text-[#8097B9] text-3xl font-bold mt-5">Comments</p>
                {singleBlog?.comments?.map((comment, index) => (
                    <CommentItem key={index} text={comment} />
                ))}
            </div>
        </div>
    );
};

export default Comments;
