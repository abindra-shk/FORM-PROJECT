import { DisplayLocations } from './displayLocations';

export default function Test() {
  return (
    <div>
      <h2>
        My first Apollo app
        <span role="img" aria-label="rocket">
          🚀
        </span>
      </h2>
      <br />
      <DisplayLocations />
    </div>
  );
}
