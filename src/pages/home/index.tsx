import './style.css';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import Typewriter from 'typewriter-effect';
import { introData, meta } from '../../content_options';
import { Link } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';

const getOrDefaultFromLocalStorage = (key: string, defaultValue: string) => {
  const storedValue = localStorage.getItem(key);
  return storedValue ? storedValue : defaultValue;
};

export const Home: React.FC = () => {
  const [title, setTitle] = useState<string>(getOrDefaultFromLocalStorage('TITLE', introData.title));
  const [description, setDescription] = useState<string>(getOrDefaultFromLocalStorage('DESC', introData.description));
  const [isEditTitle, setEditTitle] = useState<boolean>(false);
  const [isEditDescription, setEditDescription] = useState<boolean>(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const [avatar, setAvatar] = useState<string>(getOrDefaultFromLocalStorage('AVATAR', introData.imgUrl));

  useEffect(() => {
    if (isEditTitle && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isEditTitle]);

  const changeType = () => {
    setEditTitle(true);
  };

  const handleChangeTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const handleChangeDescription = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setDescription(e.target.value);
  };

  const saveTitle = () => {
    localStorage.setItem('TITLE', title);
    setEditTitle(false);
  };

  const saveDescription = () => {
    localStorage.setItem('DESC', description);
    setEditDescription(false);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      saveTitle();
    } else if (e.key === 'Escape') {
      setTitle(localStorage.getItem('TITLE') || introData.title);
      setEditTitle(false);
    }
  };

  const handleDescriptionKeyPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter') {
      saveDescription();
    } else if (e.key === 'Escape') {
      setDescription(getOrDefaultFromLocalStorage('DESC', introData.description));
      setEditDescription(false);
    }
  };

  const handleClickAvatar = () => {
    if (inputRef.current) {
      inputRef.current.click();
    }
  };

  const handleChangeAvatar = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      const reader = new FileReader();

      reader.onloadend = () => {
        setAvatar(reader.result as string);
      };

      localStorage.setItem('AVATAR', avatar);

      reader.readAsDataURL(file);
    }
  };

  return (
    <HelmetProvider>
      <section id="home" className="home">
        <Helmet>
          <meta charSet="utf-8" />
          <title> {meta.title}</title>
          <meta name="description" content={meta.description} />
        </Helmet>

        <div className="intro_sec d-block d-lg-flex align-items-center ">
          <div
            onDoubleClick={handleClickAvatar}
            className="h_bg-image order-1 order-lg-2 h-100 "
            style={{ backgroundImage: `url(${avatar})` }}
          ></div>
          <input
            type="file"
            ref={inputRef}
            onChange={handleChangeAvatar}
            style={{
              display: 'none',
            }}
            accept="image/*"
          />
          <div className="text order-2 order-lg-1 h-100 d-lg-flex justify-content-center">
            <div className="align-self-center ">
              <div className="intro mx-auto">
                <h2>I'm </h2>
                {isEditTitle ? (
                  <input
                    type="text"
                    className="home-change-title-input"
                    value={title}
                    onChange={handleChangeTitle}
                    onKeyUp={handleKeyPress}
                    ref={inputRef}
                  />
                ) : (
                  <h2 className="mb-1x">
                    <span
                      // onClick={() => {
                      //   window.print();
                      // }}
                      onDoubleClick={changeType}
                    >
                      {title}
                    </span>
                  </h2>
                )}
                <h1 className="fluidz-48 mb-1x">
                  <Typewriter
                    options={{
                      strings: [introData.animated.first, introData.animated.second, introData.animated.third],
                      autoStart: true,
                      loop: true,
                      deleteSpeed: 10,
                    }}
                  />
                </h1>
                {isEditDescription ? (
                  <textarea
                    className="home-text-area-description"
                    rows={12}
                    value={description}
                    onChange={handleChangeDescription}
                    onBlur={saveDescription}
                    onKeyUp={handleDescriptionKeyPress}
                  />
                ) : (
                  <p className="mb-1x" onDoubleClick={() => setEditDescription(true)}>
                    {description}
                  </p>
                )}
                <div className="intro_btn-action pb-5">
                  <Link to="/portfolio" className="text_2">
                    <div id="button_p" className="ac_btn btn ">
                      My Portfolio
                      <div className="ring one"></div>
                      <div className="ring two"></div>
                      <div className="ring three"></div>
                    </div>
                  </Link>
                  <Link to="/contact">
                    <div id="button_h" className="ac_btn btn">
                      Contact Me
                      <div className="ring one"></div>
                      <div className="ring two"></div>
                      <div className="ring three"></div>
                    </div>
                  </Link>
                  <a
                    target="_blank"
                    href="https://drive.google.com/file/d/1XI1H_W0QhUU1Y-YJaaVdx8cWnh7MqO8o/view"
                    id="button_p"
                    className="ac_btn btn "
                  >
                    My CV
                    <div className="ring one"></div>
                    <div className="ring two"></div>
                    <div className="ring three"></div>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </HelmetProvider>
  );
};
