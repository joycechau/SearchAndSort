import React from 'react';

export default class Header extends React.Component{
  constructor(props) {
    super(props);
  }

  render() {
    return (
			<div className="header">
				<div className="header-title">
					Search and Sort Visualizer
				</div>
				<div className="collaborators">
					<div className="collaborators-title">
						Collaborators:
					</div>
					<div className="authors">
						<div className="andrew">
							<div>Andrew Yueh</div>
              <div className="links">
                <a href=""
                  target="_blank"
                  className="linkedin-link">
                  <img src="https://res.cloudinary.com/joycechau/image/upload/v1486007000/linkedin2.jpg"
                    alt="linkedin"
                    className="linkedin-image"/>
                </a>
                <a href=""
                  target="_blank"
                  className="github-link">
                  <img src="https://res.cloudinary.com/joycechau/image/upload/c_scale,w_20/v1485282244/github.png"
                    alt="github"
                    className="github-image"/>
                </a>
              </div>
						</div>
						<div className="jeffrey">
							<div>Jeffrey Fan</div>
              <div className="links">
                <a href=""
                  target="_blank"
                  className="linkedin-link">
                  <img src="https://res.cloudinary.com/joycechau/image/upload/v1486007000/linkedin2.jpg"
                    alt="linkedin"
                    className="linkedin-image"/>
                </a>
                <a href=""
                  target="_blank"
                  className="github-link">
                  <img src="https://res.cloudinary.com/joycechau/image/upload/c_scale,w_20/v1485282244/github.png"
                    alt="github"
                    className="github-image"/>
                </a>
              </div>
						</div>
						<div className="joyce">
							<div>Joyce Chau</div>
              <div className="links">
                <a href=""
                  target="_blank"
                  className="linkedin-link">
                  <img src="https://res.cloudinary.com/joycechau/image/upload/v1486007000/linkedin2.jpg"
                    alt="linkedin"
                    className="linkedin-image"/>
                </a>
                <a href=""
                  target="_blank"
                  className="github-link">
                  <img src="https://res.cloudinary.com/joycechau/image/upload/c_scale,w_20/v1485282244/github.png"
                    alt="github"
                    className="github-image"/>
                </a>
              </div>
						</div>
					</div>
				</div>
			</div>
    );
  }
}
