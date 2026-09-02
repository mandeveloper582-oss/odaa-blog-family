import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { getComments, addComment, deleteComment } from '../../services/firebase';

export default function CommentSection({ comments = [], postId }) {
  const [name, setName] = useState('');
  const [text, setText] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [localComments, setLocalComments] = useState(comments || []);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadComments();
  }, [postId]);

  const loadComments = async () => {
    setLoading(true);
    const result = await getComments(postId);
    if (result.success) {
      setLocalComments(result.comments || []);
    }
    setLoading(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim() || !text.trim()) {
      toast.error('Please enter your name and comment');
      return;
    }

    setSubmitting(true);
    
    const commentData = {
      name: name.trim(),
      text: text.trim(),
      createdAt: new Date(),
    };

    const result = await addComment(postId, commentData);
    
    if (result.success) {
      const newComment = result.comment || result.data || {};
      const commentToAdd = {
        ...newComment,
        id: newComment.id || newComment._id,
      };

      setLocalComments((prev) => [commentToAdd, ...prev]);
      setName('');
      setText('');
      toast.success('Comment posted successfully!');
    } else {
      toast.error(result.error || 'Failed to post comment');
    }
    setSubmitting(false);
  };

  const handleDeleteComment = async (commentId) => {
    if (!window.confirm('Delete this comment?')) return;

    const result = await deleteComment(commentId, postId);
    if (result.success) {
      setLocalComments(localComments.filter(c => c.id !== commentId && c._id !== commentId));
      toast.success('Comment deleted');
    } else {
      toast.error(result.error || 'Failed to delete comment');
    }
  };

  return (
    <div className="mt-8 animate-fade-in">
      <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-6 flex items-center gap-2">
        💬 Comments <span className="text-primary-500">({localComments.length})</span>
      </h3>

      {/* Comment Form */}
      <form onSubmit={handleSubmit} className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-6 mb-8">
        <h4 className="text-lg font-semibold mb-4">Leave a Comment</h4>
        <div className="space-y-4">
          <input
            type="text"
            placeholder="Your name *"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="input-field"
            required
          />
          <textarea
            rows="4"
            placeholder="Write your comment... *"
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="input-field resize-none"
            required
          />
          <button type="submit" disabled={submitting} className="btn-primary w-full md:w-auto">
            {submitting ? 'Posting...' : 'Post Comment →'}
          </button>
        </div>
      </form>

      {/* Comments List */}
      <div className="space-y-4">
        {loading ? (
          <div className="text-center py-8 text-gray-500">Loading comments...</div>
        ) : localComments.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            No comments yet. Be the first to share your thoughts!
          </div>
        ) : (
          localComments.map(comment => (
            <div key={comment.id || comment._id} className="bg-white dark:bg-gray-800 rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex justify-between items-start mb-2">
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full flex items-center justify-center text-white font-bold">
                    {comment.name?.charAt(0).toUpperCase() || '?'}
                  </div>
                  <div>
                    <div className="font-semibold text-gray-800 dark:text-white">{comment.name}</div>
                    <div className="text-xs text-gray-500">
                      {comment.createdAt ? new Date(comment.createdAt).toLocaleDateString() : 'Just now'}
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => handleDeleteComment(comment.id || comment._id)}
                  className="text-red-500 hover:text-red-700 text-sm"
                >
                  Delete
                </button>
              </div>
              <p className="text-gray-600 dark:text-gray-300 ml-12">{comment.text}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}