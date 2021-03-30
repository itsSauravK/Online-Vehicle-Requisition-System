import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../redux/user/user.actions';

const LandingPage = () => {
  const { user } = useSelector((state) => state.userLogin);

  const dispatch = useDispatch();

  return (
    <div>
      <h1>Landing Page</h1>
      {user ? (
        <button onClick={() => dispatch(logout())}>Log out</button>
      ) : (
        <h1>Please log in</h1>
      )}
    </div>
  );
};

export default LandingPage;
