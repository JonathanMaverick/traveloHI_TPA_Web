import { Link } from "react-router-dom"
import "../styles/components/footer.scss"

export default function Footer(){

    return(
        <>
        <div className="footer">
            <div className="footer-content">
                <div className="footer-container">
                    <h1>TraveloHI</h1>  
                    <div className="payment-partner">
                        <div className="image-payment-partner">
                            <img src="https://ik.imagekit.io/tvlk/image/imageResource/2019/05/20/1558336137510-758f10ec383cb349ffee7bc0fa516c3f.png"></img>
                        </div>
                        <div className="image-payment-partner">
                            <img src="https://ik.imagekit.io/tvlk/image/imageResource/2019/05/20/1558336144166-e6e7ce40ff72a97e6e0eeeabda7595d7.png"></img>
                        </div>
                        <div className="image-payment-partner">
                            <img src="https://ik.imagekit.io/tvlk/image/imageResource/2019/05/20/1558336148727-34b7516141fad67cf3b28a682ab0cc93.png"></img>
                        </div>
                        <div className="image-payment-partner">
                            <img src="https://ik.imagekit.io/tvlk/image/imageResource/2019/05/20/1558336152817-f0ef4ea005ad461b4b2cd0a8fdec6628.png"></img>
                        </div>
                        <div className="image-payment-partner">
                            <img src="https://ik.imagekit.io/tvlk/image/imageResource/2019/05/20/1558336157462-2cdb1a639427a49e80060bb6e293d50f.png"></img>
                        </div>
                        <div className="image-payment-partner">
                            <img src="https://ik.imagekit.io/tvlk/image/imageResource/2019/05/20/1558336160378-6e3d05dade33f8b94afb06edad45582e.png"></img>
                        </div>
                        <div className="image-payment-partner">
                            <img src="https://ik.imagekit.io/tvlk/image/imageResource/2019/05/20/1558336163461-ce2666b8eba5b3d3b949a6f880d7dc11.png"></img>
                        </div>
                        <div className="image-payment-partner">
                            <img src="https://ik.imagekit.io/tvlk/image/imageResource/2019/05/20/1558336166816-6749d37525bdb6599b47e8f134a094f6.png"></img>
                        </div>
                        <div className="image-payment-partner">
                            <img src="https://ik.imagekit.io/tvlk/image/imageResource/2019/05/20/1558336170813-a362e7f1758db9360ee23dfb38463ae4.png"></img>
                        </div>
                        <div className="image-payment-partner">
                            <img src="https://ik.imagekit.io/tvlk/image/imageResource/2019/05/20/1558336173985-7a9c617faf21b6770c4b81bfae3df621.png"></img>
                        </div>
                        <div className="image-payment-partner">
                            <img src="https://ik.imagekit.io/tvlk/image/imageResource/2019/05/20/1558336177499-40bb5a5235dfd94d382e48e57d319f39.png"></img>
                        </div>
                        <div className="image-payment-partner">
                            <img src="https://ik.imagekit.io/tvlk/image/imageResource/2019/05/20/1558336179849-a560c62e45c48fc3794e7836d6bcdd82.png"></img>
                        </div>
                        <div className="image-payment-partner">
                            <img src="https://ik.imagekit.io/tvlk/image/imageResource/2019/05/20/1558336183581-661985adfc84121fecd998c0cbb04fc0.png"></img>
                        </div>
                        <div className="image-payment-partner">
                            <img src="https://ik.imagekit.io/tvlk/image/imageResource/2019/05/20/1558336193743-cea39860a58857ad31e17b3fd685b716.png"></img>
                        </div>
                        <div className="image-payment-partner">
                            <img src="https://ik.imagekit.io/tvlk/image/imageResource/2023/12/19/1702974152057-a786b4d9a2e3aac6aad8bdb1a4efdc8e.png"></img>
                        </div>
                        <div className="image-payment-partner">
                            <img src="https://ik.imagekit.io/tvlk/image/imageResource/2023/12/19/1702974155573-cc011a794d72fe9c09b1927ac5ce917c.png"></img>
                        </div>
                    </div>  
                </div>
                <div className="footer-container">
                    <h3>About Traveloka</h3>
                    <Link to="/">
                        <p>Home</p>
                    </Link>
                    <Link to="/login">
                        <p>Login</p>
                    </Link>
                    <Link to="/register">
                        <p>Register</p>
                    </Link>
                    <Link to="/game">
                        <p>Game</p>
                    </Link>
                </div>
                <div className="footer-container">
                    <h3>Follow Us</h3>
                    <div className="follow-us">
                        <Link to="https://twitter.com/Traveloka">
                            <div className="follow-us-content">
                                <img src="https://d1785e74lyxkqq.cloudfront.net/_next/static/v2/f/f1bc6ea729dc438511f45244f72d6380.svg" alt="" />
                                <p>Twitter</p>
                            </div>
                        </Link>
                        <Link to="https://www.facebook.com/traveloka.id/">
                            <div className="follow-us-content">
                                <img src="https://d1785e74lyxkqq.cloudfront.net/_next/static/v2/6/6904cd2e74ef73120833cff12185a320.svg" alt="" />
                                <p>Facebook</p>
                            </div>
                        </Link>
                        <Link to="https://www.instagram.com/hansindrawan/">
                            <div className="follow-us-content">
                                <img src="https://d1785e74lyxkqq.cloudfront.net/_next/static/v2/6/62a2fc240d7e00b05d0d6f6b4e785110.svg" alt="" />
                                <p>Instagram</p>
                            </div>
                        </Link>
                        <Link to="https://www.youtube.com/channel/UCEuB9uMwSjvTfX9L8tamiIA/videos">
                            <div className="follow-us-content">
                                <img src="https://d1785e74lyxkqq.cloudfront.net/_next/static/v2/b/b593add66303beb2a0cae9e96963e68b.svg" alt="" />
                                <p>Youtube</p>
                            </div>
                        </Link>
                        <Link to="https://www.tiktok.com/@traveloka.id?lang=id-ID">
                            <div className="follow-us-content">
                                <img src="https://d1785e74lyxkqq.cloudfront.net/_next/static/v2/4/471f17c1510d49a98bec08a48b84c607.svg" alt="" />
                                <p>Tiktok</p>
                            </div>
                        </Link>
                    </div>
                </div>
            </div>
            <div className="copyright">
                <p>Copyright © 2024 Traveloka. All rights reserved.</p> 
            </div>
        </div>
        </>
        
    )
}