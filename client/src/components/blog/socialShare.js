const SocialShare = ({ url }) => {
  return (
    <div className="flex space-x-2">
      <a href={`https://www.facebook.com/sharer/sharer.php?u=${url}`} target="_blank" rel="noopener noreferrer" className="text-blue-600">
        Facebook
      </a>
      <a href={`https://twitter.com/intent/tweet?url=${url}`} target="_blank" rel="noopener noreferrer" className="text-blue-400">
        Twitter
      </a>
      <a href={`https://www.pinterest.com/pin/create/button/?url=${url}`} target="_blank" rel="noopener noreferrer" className="text-red-600">
        Pinterest
      </a>
      <a href={`https://www.instagram.com/`} target="_blank" rel="noopener noreferrer" className="text-purple-600">
        Instagram
      </a>
    </div>
  );
};

export default SocialShare;
