
import React, { useState } from 'react';
import { FaHeart } from 'react-icons/fa';
import { PiShareFat } from 'react-icons/pi';
import { IoClose } from 'react-icons/io5';
import image1 from '../Assetee/image1.jpeg';
import image2 from '../Assetee/image2.webp';
import {
  FacebookShareButton,
  TwitterShareButton,
  WhatsappShareButton,
  EmailShareButton,
  TelegramShareButton,
  FacebookIcon,
  TwitterIcon,
  WhatsappIcon,
  EmailIcon,
  TelegramIcon,
} from 'react-share';
import { RWebShare } from 'react-web-share';

function Card({ postId, postContent, imageUrl, useWebShare }) {
  const [isLiked, setIsLiked] = useState(false);
  const [showPopup, setShowPopup] = useState(false);

  const handleLikeClick = () => {
    setIsLiked(!isLiked);
  };

  const handleClosePopup = () => {
    setShowPopup(false);
  };
  const shareViaWebShare = async () => {
    try {
      if (navigator.share) {
        await navigator.share({
          title: 'Your post title',
          text: postContent,
          url: 'https://www.example.com',
        });
      }
    } catch (error) {
      console.error('Error sharing via Web Share API:', error);
    } finally {
      handleClosePopup();
    }
  };

  return (
    <div className="card">
      <div className="card-content">
        {imageUrl && <img src={imageUrl} alt="Post" width="100%" height={250} />}
        <p>{postContent}</p>
      </div>
      <div className={`card-actions ${isLiked ? 'liked' : ''}`}>
        <div className="like-share-buttons">
          <FaHeart size={20} color={isLiked ? 'red' : 'grey'} onClick={handleLikeClick} />
          <label>&nbsp;Like</label>
          {useWebShare ? (
            <PiShareFat size={20} onClick={shareViaWebShare} />
          ) : (
            <PiShareFat size={20} onClick={() => setShowPopup(true)} />
          )}
          <label>&nbsp;Share</label>
        </div>

        {showPopup && (
          <div className="icons">
            <div className="close" onClick={handleClosePopup}>
              <IoClose size={20} />
            </div>
            {useWebShare ? (
              <RWebShare
                data={{
                title:"Your post title",
                text:{postContent},
                url:"https://www.example.com",
                }}
                onClick={() => setShowPopup(true)}
                >
              </RWebShare>
            ) : (
              <>
                <div className="items">
                  <FacebookShareButton url={'https://www.example.com'}>
                    <FacebookIcon size={50} round />
                    <p>Facebook</p>
                  </FacebookShareButton>
                </div>
                <div className="items">
                  <TwitterShareButton url={'https://www.example.com'}>
                    <TwitterIcon size={50} round />
                    <p>Twitter</p>
                  </TwitterShareButton>
                </div>
                <div className="items">
                  <WhatsappShareButton url={'https://www.example.com'}>
                    <WhatsappIcon size={50} round />
                    <p>Whatsapp</p>
                  </WhatsappShareButton>
                </div>
                <div className="items">
                  <EmailShareButton url={'https://www.example.com'}>
                    <EmailIcon size={50} round />
                    <p>Email</p>
                  </EmailShareButton>
                </div>
                <div className="items">
                  <TelegramShareButton url={'https://www.example.com'}>
                    <TelegramIcon size={50} round />
                    <p>Telegram</p>
                  </TelegramShareButton>
                </div>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

function Home() {
  return (
    <div className="container">
      <h2 style={{ color: 'purple' }}> NEWS </h2>
      <Card
        postId={1}
        imageUrl={image1}
        postContent="ChatGPT maker OpenAI said on Friday Sam Altman will step down as
         the company's chief executive officer. OpenAI's Chief Technology Officer Mira 
         Murati will serve as interim CEO, the company said, adding that it will conduct 
         a formal search for a permanent CEO.'Altman's departure follows a deliberative 
         review process by the board,which concluded that he was not consistently candid in 
         his communications with the board, hindering its ability to exercise its responsibilities, 
         according to OpenAI'."
      />
      <Card
        postId={2} 
        useWebShare
        imageUrl={image2}
        postContent= "India's cricket team has been praised for their 
        performance in the World Cup, and the support staff behind the scenes have played a crucial role. 
        Led by head coach Rahul Dravid, the coaching staff, 
        including batting coach Vikram Rathour and bowling coIach 
        Paras Mhambrey, have aligned with Dravid's vision and built 
        a good rapport with the players."
      />
    </div>
  );
}

export default Home;
