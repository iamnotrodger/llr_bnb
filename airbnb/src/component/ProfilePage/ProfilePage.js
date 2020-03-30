import React, { useState, useEffect, useContext } from 'react';
import TabControl from '../ReactTab/ReactTab';
import UserContext from '../../UserContext';
import ProfileSide from './ProfileSide';
import PropertyMap from '../Property/PropertyList/PropertyMap';
import ReviewList from '../Review/ReviewList/ReviewList';
import LoadingScreen from '../LoadingScreen/LoadingScreen';
import LoadSpinner from '../LoadingScreen/LoadSpinner';
import './ProfilePage.css';
import AgreementList from '../RentalAgreement/AgreementList/AgreementList';

const ProfilePage = () => {
        const { user } = useContext(UserContext);
        const uid = user ? user.uid : null;
        const gid = user ? user.gid : null;
        const hid = user ? user.hid : null;
        const [userInfo, setUserInfo] = useState({
                uid: null,
                firstname: '',
                lastname: '',
                address: '',
                email: '',
                phonenum: '',
                created: new Date()
        });
        const [oldUserInfo, setOldUserInfo] = useState(userInfo);
        const [reviews, setReviews] = useState([]);
        const [agreements, setAgreements] = useState([]);
        const [hostProperty, setHostProperty] = useState([]);
        const [edit, setEdit] = useState(true);
        const [loading, setLoading] = useState(false);
        const [loadAction, setLoadAction] = useState(false);

        useEffect(() => {	// run when render()
                const abordController = new AbortController();
                const signal = abordController.signal;
                const fetchData = async () => {		// async func define
                        setLoading(true);
                        try {
                                const responseOne = await fetch(
                                        `http://localhost:3000/api/profile/${uid}`,
                                        { signal: signal }
                                );

                                if (!responseOne.ok) {
                                        throw Error(
                                                'Failed to get User Information.'
                                        );
                                }
                                const fetchedUser = await responseOne.json();
                                setUserInfo({
                                        ...fetchedUser,
                                        created: new Date(fetchedUser.created)
                                });
                                setOldUserInfo({
                                        ...fetchedUser,
                                        created: new Date(fetchedUser.created)
                                });

                                const responseTwo = await fetch(
                                        `http://localhost:3000/api/profile/review/review-list/${gid}`
                                );
                                if (responseTwo.ok) {
                                        const fetchedRevs = await responseTwo.json();
                                        setReviews(fetchedRevs);
                                }
                                if (hid) {
                                        const responseThree = await fetch(
                                                `http://localhost:3000/api/profile/${uid}/my-property`
                                        );
                                        if (responseThree.ok) {
                                                const fetchedProperties = await responseThree.json();
                                                setHostProperty(
                                                        fetchedProperties
                                                );
                                        }

                                        const responseFour = await fetch(
                                                `http://localhost:3000/api/rental/rental-agreement/host/${hid}`
                                        );
                                        if (responseFour.ok) {
                                                const fetchedAgrees = await responseFour.json();
                                                setAgreements(fetchedAgrees.rental_agreement_list);
                                        }
                                }else{
                                        const responseFour = await fetch(
                                                `http://localhost:3000/api/rental/rental-agreement/host/${gid}`
                                        );
                                        if (responseFour.ok) {
                                                const fetchedAgrees = await responseFour.json();
                                                setAgreements(fetchedAgrees.rental_agreement_list);
                                        }
                                }
                                setLoading(false);
                        } catch (err) {
                                console.log(err);
                                setLoading(false);
                        }
                };
                fetchData();	// async func call
                return function cleanup() {
                        abordController.abort();	// abort when error
                };
        }, [uid]); // run every time when uid is changed

        const handleTab = (data) => {
                console.log(data);
        };

        const onEditClick = () => {
                setEdit(!edit);

                if (!edit) {
                        setUserInfo(oldUserInfo);
                }
        };

        const onSubmit = async () => {
                try {
                        if (
                                JSON.stringify(userInfo) ===
                                JSON.stringify(oldUserInfo)
                        ) {
                                throw Error('No change was made.');
                        }
                        setLoadAction(true);
                        if (
                                userInfo.firstname !== oldUserInfo.firstname ||
                                userInfo.lastname !== oldUserInfo.lastname
                        ) {
                                const response = await fetch(
                                        'http://localhost:3000/api/profile/update/name',
                                        {
                                                method: 'put',
                                                headers: {
                                                        'Content-Type':
                                                                'application/json'
                                                },
                                                body: JSON.stringify({
                                                        firstName:
                                                                userInfo.firstname,
                                                        lastName:
                                                                userInfo.lastname,
                                                        uid: uid
                                                })
                                        }
                                );
                                if (!response.ok) {
                                        throw Error('Unable to update');
                                }
                        }
                        if (userInfo.email !== oldUserInfo.email) {
                                await updateUserInfo(
                                        'email',
                                        userInfo.email,
                                        uid
                                );
                        }
                        if (userInfo.address !== oldUserInfo.address) {
                                await updateUserInfo(
                                        'address',
                                        userInfo.address,
                                        uid
                                );
                        }

                        if (userInfo.phonenum !== oldUserInfo.phonenum) {
                                await updateUserInfo(
                                        'phonenum',
                                        userInfo.phonenum,
                                        uid
                                );
                        }
                        setLoadAction(false);
                        setOldUserInfo(userInfo);
                        setEdit(true);
                } catch (err) {
                        console.log(err);
                        onEditClick();
                        setLoadAction(false);
                }
        };

        const onUserChange = (event) => {
                const { name, value } = event.target;
                setUserInfo({ ...userInfo, [name]: value });
        };

        return (
                <LoadingScreen loading={loading}>
                        <LoadSpinner loading={loadAction} />
                        <div className='profileContainer'>
                                <div className='profileSide'>
                                        <ProfileSide
                                                user={userInfo}
                                                onChange={onUserChange}
                                                edit={edit}
                                                setEdit={onEditClick}
                                                onSubmit={onSubmit}
                                        />
                                </div>
                                <div className='profileContent'>
                                        <div className='profileHeader'>
                                                <div className='headerContent'>
                                                        <h2>{`Hi, I'm ${userInfo.firstname}`}</h2>
                                                        <p>{`Joined in ${userInfo.created.getFullYear()}`}</p>
                                                </div>
                                        </div>
                                        <div className='profileMain'>
                                                <TabControl setTab={handleTab}>
                                                        <div name='Reviews'>
                                                                <div className='lineMargin'>
                                                                        <div className='lml'></div>
                                                                </div>
                                                                <ReviewList
                                                                        reviews={
                                                                                reviews
                                                                        }
                                                                />
                                                        </div>
                                                        <div name='Rental Agreements'>
                                                                <div className='lineMargin'>
                                                                        <div className='lml'></div>
                                                                </div>
                                                                <AgreementList
                                                                        agreements={ agreements }
                                                                        setLoading={ setLoadAction }
                                                                />
                                                        </div>
                                                        <div
                                                                name='Host Properties'
                                                                style={{
                                                                        display: hid
                                                                                ? ''
                                                                                : 'none'
                                                                }}>
                                                                <div className='lineMargin'>
                                                                        <div className='lml'></div>
                                                                </div>
                                                                <PropertyMap
                                                                        properties={
                                                                                hostProperty
                                                                        }
                                                                />
                                                        </div>
                                                </TabControl>
                                        </div>
                                </div>
                        </div>
                </LoadingScreen>
        );
};

const updateUserInfo = async (name, value, uid) => {
        const response = await fetch(
                `http://localhost:3000/api/profile/update/${name}`,
                {
                        method: 'put',
                        headers: {
                                'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                                [name]: value,
                                uid: uid
                        })
                }
        );
        if (response.ok) {
                return;
        }
        throw Error('Unable to update');
};

export default ProfilePage;
