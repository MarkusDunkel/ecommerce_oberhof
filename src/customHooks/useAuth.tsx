import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { RootState } from '../redux/store';

const mapState = (state: RootState) => ({ currentUser: state.user.id })

const useAuth = (props: any) => {
    const { currentUser } = useSelector(mapState);
    console.log('Current user in useAuth', currentUser)
    const history = useNavigate();

    useEffect(() => {
        if (!currentUser) {
            history("/login");
        }

    }, [currentUser]);

    return currentUser;
};

export default useAuth;