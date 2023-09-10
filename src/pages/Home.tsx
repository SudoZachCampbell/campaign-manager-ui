import './Home.styles.scss';

interface HomeProps {}

export default function Home() {
  return (
    <div className="homepage__container">
      <div className="homepage__header">
        <h1>CAMPAIGN MANAGER</h1>
      </div>
      <div className="homepage__content">
        <div className="homepage__dial">
          <div className="top">
            <div className="left">
              <p>Compendium</p>
            </div>
            <div className="right">
              <p>Campaigns</p>
            </div>
          </div>
          <div className="bottom">
            <div className="left">
              <p>Profile</p>
            </div>
            <div className="right">
              <p>Other thing</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
