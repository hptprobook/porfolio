import "./style.css";
import {
    FaGithub,
    FaTwitter,
    FaFacebookF,
    FaLinkedin,
    FaYoutube,
    FaTwitch,
} from "react-icons/fa";
import { socialProfiles } from "../../content_options";

export const Socialicons: React.FC = () => {
    return (
        <div className="stick_follow_icon">
            <ul>
                {socialProfiles.twitter && (
                    <li>
                        <a target="_blank" href={socialProfiles.twitter}>
                            <FaTwitter />
                        </a>
                    </li>
                )}
                {socialProfiles.github && (
                    <li>
                        <a target="_blank" href={socialProfiles.github}>
                            <FaGithub />
                        </a>
                    </li>
                )}
                {socialProfiles.facebook && (
                    <li>
                        <a target="_blank" href={socialProfiles.facebook}>
                            <FaFacebookF />
                        </a>
                    </li>
                )}
                {socialProfiles.linkedin && (
                    <li>
                        <a target="_blank" href={socialProfiles.linkedin}>
                            <FaLinkedin />
                        </a>
                    </li>
                )}
                {socialProfiles.youtube && (
                    <li>
                        <a target="_blank" href={socialProfiles.youtube}>
                            <FaYoutube />
                        </a>
                    </li>
                )}
                {socialProfiles.twitch && (
                    <li>
                        <a target="_blank" href={socialProfiles.twitch}>
                            <FaTwitch />
                        </a>
                    </li>
                )}
            </ul>
            <p>Follow Me</p>
        </div>
    );
};
