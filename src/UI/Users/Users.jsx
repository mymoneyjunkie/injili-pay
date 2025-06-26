import { useState, useEffect } from "react";

import useAxiosPrivate from '../../hooks/useAxiosPrivate';

import { useSelector } from 'react-redux';

import { useNavigate, useLocation } from "react-router-dom";

import { Loader } from '../../components';

const Users = () => {
	const navigate = useNavigate();
	const location = useLocation();

	const queryParams = new URLSearchParams(location.search);

	const someParam = queryParams.get('session_id');
	// console.log(someParam);

	const axiosPrivate = useAxiosPrivate();

	const currentUser = useSelector((state) => state.user.currentUser);

	// console.log(currentUser, someParam);

	const [ errMsg, setErrMsg ] = useState(null);
	const [ isLoading, setIsLoading ] = useState(true);

	useEffect(() => {
		let isMounted = true;
		const controller = new AbortController();

		const getSubStatus = async () => {
		  	try {
			    const response = await axiosPrivate.post(
			      "/api/v1/payments/subscription-current",
			      { email: currentUser?.email, customer: someParam },
			      { signal: controller.signal }
			    );

			    // console.log(response.data);
			    
			    if (isMounted && response.data?.isSuccess) {
			      setIsLoading(false);
			      navigate("/success", { state: { from: location }, replace: true });
			    }

			    else {
			      navigate("/cancel", { state: { from: location }, replace: true });
			    }
		  	}

		  	catch (error) {
		  		console.log(error);
			    // Check if this is a canceled request - this is normal during unmounting
			    if (error.name === 'CanceledError' || error.code === 'ERR_CANCELED') {
			      // console.log('Request was canceled', error.message);
			      return; // Don't navigate if it was just canceled
			    }

			    else if (error.response?.data) {
			    	setErrMsg(error.response?.data.message);

			    	window.scrollTo({ top: 0, behavior: 'smooth' });

			    	const interval = setTimeout(() => {
	                    if (isMounted) setErrMsg('');
	                }, 3000);

	                // Clear the timeout on cleanup
	                return () => {
	                    clearTimeout(interval);
	                };
			    }
			    
			    // Only navigate to login for actual auth errors
			    // else if (error.response?.data.statusCode === 401) {
			    //   navigate("/login", { state: { from: location }, replace: true });
			    // }

			    else {
			    	// console.error("Error fetching plans:", error);
			    	return;
			    }
		  	}
		};

		getSubStatus();

		return () => {
			isMounted = false;
			controller.abort();
		}
	}, [someParam])

	return (
	    <div>
	    	{isLoading ? (
				  	<Loader />
			) : (
				<>
			      	<p>Please Wait...</p>
			    </>
			)}
	    </div>
	)
}

export default Users;