import React, { useRef, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Modal } from 'react-bootstrap';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import { getRolesDataLevelWise } from '../../../actions/Role';
import { getSingleRegionUser, getRegionsData } from '../../../actions/Region';
import { removeErrorData } from '../../../actions/RemoveError';
import { schoolUserData } from '../../../actions/School';
import {
	getWoredaUser,
	getRegionSpecificWoredasData,
} from '../../../actions/Woreda';
import { getSingleFederalData } from '../../../actions/Federal';
import { addProfileData } from '../../../actions/User';
import { useDispatch, useSelector } from 'react-redux';
import * as yup from 'yup';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { toast } from 'react-toastify';
import { useParams } from 'react-router-dom';
import DatePicker from 'react-datepicker';

import 'react-datepicker/dist/react-datepicker.css';

const phoneRegExp =
	/^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
//validation
//student
const validationStudentSchema = yup.object({
	first_name: yup
		.string()
		.required('Cannot be blank')
		.matches(/^[aA-zZ\s]+$/, 'Only alphabets are allowed'),
	middle_name: yup
		.string()
		.required('Cannot be blank')
		.matches(/^[aA-zZ\s]+$/, 'Only alphabets are allowed'),
	last_name: yup
		.string()
		.required('Cannot be blank')
		.matches(/^[aA-zZ\s]+$/, 'Only alphabets are allowed'),
	phone_number: yup
		.string()
		.min(10, 'Phone number must be 10 characters')
		.max(10, 'Phone number must be 10 characters')
		.required('Cannot be blank')
		.matches(/^\d+$/, 'Only numbers'),
});

const validationSchemaForLocationTab = yup.object({
	address: yup.string().required('Cannot be blank'),
	region: yup.string().required('Please select one option'),
	woreda: yup.string().required('Please select one option'),
});

const validationStudentSchemaForOptionalTab = yup.object({
	sex1: yup.string().required('Please select one option'),
	marital_status: yup.string().required('Please select one option'),
	dob1: yup.string().required('Cannot be blank'),
	citizenship1: yup.string().required('Please select one option'),
	disability: yup.string().required('Please select one option'),
});

//teacher
const validationTeacherSchema = yup.object({
	first_name: yup
		.string()
		.required('Cannot be blank')
		.matches(/^[aA-zZ\s]+$/, 'Only alphabets are allowed'),
	middle_name: yup
		.string()
		.required('Cannot be blank')
		.matches(/^[aA-zZ\s]+$/, 'Only alphabets are allowed'),
	last_name: yup
		.string()
		.required('Cannot be blank')
		.matches(/^[aA-zZ\s]+$/, 'Only alphabets are allowed'),
	sex: yup.string().required('Please select one option'),
	citizenship: yup.string().required('Please select one option'),
	dob: yup.string().required('Cannot be blank'),
	phone_number: yup
		.string()
		.min(10, 'Phone number must be 10 characters')
		.max(10, 'Phone number must be 10 characters')
		.required('Cannot be blank')
		.matches(/^\d+$/, 'Only numbers'),
});

const validationTeacherSchemaForOtherTab = yup.object({
	emp_contract: yup.string().required('Please select one option'),
	education_level: yup.string().required('Please select one option'),
	major_fields: yup.string().required('Please select one option'),
	minor_fields: yup.string().required('Please select one option'),
	pedagogical_training: yup.string().required('Please select one option'),
	salary: yup.string().required('Cannot be blank'),
	currency: yup.string().required('Cannot be blank'),
	title: yup.string().required('Please select one option'),
	is_teaching_license: yup.string().required('Please select one option'),
	continue_prof_dev: yup.string().required('Please select one option'),
	is_eng_development: yup.string().required('Please select one option'),
	is_basic_comp_course: yup.string().required('Please select one option'),
	is_coc: yup.string().required('Please select one option'),
	is_sci_tech_math_course: yup.string().required('Please select one option'),
	disability: yup.string().required('Please select one option'),
});

const AddUserModal = (props) => {
	const [key, setKey] = useState('Basic');
	const [disable1, setDisable1] = useState(true);
	const [disable2, setDisable2] = useState(true);
	const [btnClickFlag, setBtnClickFlag] = useState(false);
	const [loading, setLoading] = useState(false);
	const [user, setuser] = useState('');
	const [date, setDates] = useState('');
	const [id, setId] = useState('');
	const [startDate, setStartDate] = useState(new Date());

	const dispatch = useDispatch();
	const formRef = useRef();
	const form1Ref = useRef();
	const form2Ref = useRef();

	const federalData = useSelector((state) => state.federalData.federalData);
	// get federal single id
	var FederalId =
		federalData &&
		federalData.results &&
		federalData.results[0] &&
		federalData.results[0].id;

	let regionId = '';
	if (window.location.href.includes('regions')) {
		regionId = window.location.href.split('/').slice(-1)[0];
	}
	let woredaId = '';
	if (window.location.href.includes('woreda')) {
		woredaId = window.location.href.split('/').slice(-1)[0];
	}

	const { error } = useSelector((state) => state);

	const params = useParams();

	const saveFirstData = (e) => {
		setBtnClickFlag(false);
		dispatch(removeErrorData());
		if (
			(!formRef.current.values.role == '' ||
				!formRef.current.values.first_name == '' ||
				!formRef.current.values.middle_name == '' ||
				!formRef.current.values.last_name == '' ||
				!formRef.current.values.phone_number == '') &&
			(user === 'Student' || user === 'student')
		) {
			setDisable1(false);
			setKey('Location');
		} else if (
			(!formRef.current.values.role == '' ||
				!formRef.current.values.first_name == '' ||
				!formRef.current.values.middle_name == '' ||
				!formRef.current.values.last_name == '' ||
				!formRef.current.values.phone_number == '' ||
				!formRef.current.values.citizenship == '' ||
				!formRef.current.values.sex == '' ||
				!formRef.current.values.dob == '') &&
			(user === 'Teacher' ||
				user === 'teacher' ||
				user === 'Other' ||
				user === 'other')
		) {
			setDisable1(false);
			setKey('Location');
		}
	};

	const saveLocationData = (e) => {
		setBtnClickFlag(false);
		dispatch(removeErrorData());
		if (
			!form1Ref.current.values.address == '' ||
			!form1Ref.current.values.region == '' ||
			!form1Ref.current.values.woreda == ''
		) {
			setDisable2(false);
			setKey('other');
		}
	};

	const saveAllData = (e) => {
		dispatch(removeErrorData());
		if (formRef.current.values.role !== '') {
			setBtnClickFlag(true);
			setLoading(true);
			let roleData = {
				roles: [formRef.current.values.role],
			};
			if (
				form2Ref.current &&
				form2Ref.current.values.marital_status === ''
			) {
				form2Ref.current.values.marital_status = 'OTHER';
			}
			if (user === 'Student' || user === 'student') {
				form2Ref.current.values.sex = form2Ref.current.values.sex1;
				form2Ref.current.values.citizenship =
					form2Ref.current.values.citizenship1;
				form2Ref.current.values.dob = form2Ref.current.values.dob1;
			}

			let save_data = '';

			if (user !== 'Other' && user !== 'other') {
				save_data = {
					...roleData,
					...formRef.current.values,
					...form1Ref.current.values,
					...form2Ref.current.values,
				};
			} else {
				save_data = {
					...roleData,
					...formRef.current.values,
					...form1Ref.current.values,
				};
			}

			let paramName = window.location.href.split('/').slice(-2)[0];
			let federalParamName = window.location.href.split('/').slice(-1)[0];
			if (federalParamName === 'federal') {
				paramName = 'federals';
				dispatch(addProfileData(save_data, FederalId, paramName));
			} else {
				let id = window.location.href.split('/').slice(-1)[0];
				if (id !== undefined && id !== 'undefined') {
					dispatch(addProfileData(save_data, id, paramName));
				}
			}
		} else {
			toast.error('Select Role');
			setKey('Basic');
		}
	};

	const userResData = useSelector((state) => state.usersData.addUserData);

	useEffect(() => {
		//if success then only execute
		let paramName = window.location.href.split('/').slice(-2)[0];
		let federalParamName = window.location.href.split('/').slice(-1)[0];
		let id = window.location.href.split('/').slice(-1)[0];

		if (
			userResData &&
			userResData[0].profile &&
			props.show &&
			btnClickFlag &&
			error.errorsData === ''
		) {
			props.closeModal();
			setBtnClickFlag(false);
			setLoading(false);
			setDisable1(true);
			setDisable2(true);
			setKey('Basic');
			setuser('');
			setDates('');
			if (paramName === 'schools') {
				toast.success('School User Added');
				dispatch(schoolUserData(id));
			} else if (paramName === 'woreda') {
				toast.success('Woreda User Added');
				dispatch(getWoredaUser(id));
			} else if (paramName === 'regions') {
				toast.success('Region User Added');
				dispatch(getSingleRegionUser(id));
			} else if (federalParamName === 'federal') {
				toast.success('Federal User Added');
				dispatch(getSingleFederalData(FederalId));
			}
		} else {
			if (error && error.errorsData && btnClickFlag) {
				setLoading(false);
				if (
					(error.errorsData.first_name ||
						error.errorsData.middle_name ||
						error.errorsData.last_name ||
						error.errorsData.username ||
						error.errorsData.phone_number) &&
					(user === 'Student' || user === 'student')
				) {
					setBtnClickFlag(false);
					setDisable1(true);
					setDisable2(true);
					setKey('Basic');
				} else if (
					error.errorsData.address ||
					error.errorsData.region ||
					error.errorsData.woreda ||
					error.errorsData.city ||
					error.errorsData.kebele
				) {
					setBtnClickFlag(false);
					setDisable2(true);
					setKey('Location');
				} else if (
					(error.errorsData.sex ||
						error.errorsData.marital_status ||
						error.errorsData.enrollment ||
						error.errorsData.dob ||
						error.errorsData.citizenship ||
						error.errorsData.disability) &&
					(user === 'Student' || user === 'student')
				) {
					setBtnClickFlag(false);
					setKey('other');
				} else if (
					(error.errorsData.first_name ||
						error.errorsData.username ||
						error.errorsData.middle_name ||
						error.errorsData.last_name ||
						error.errorsData.phone_number ||
						error.errorsData.sex ||
						error.errorsData.sex ||
						error.errorsData.sex ||
						error.errorsData.dob) &&
					(user === 'Teacher' ||
						user === 'teacher' ||
						user === 'Other' ||
						user === 'other')
				) {
					setBtnClickFlag(false);
					setDisable1(true);
					setDisable2(true);
					setKey('Basic');
				} else if (
					(error.errorsData.emp_year ||
						error.errorsData.emp_year_teacher ||
						error.errorsData.emp_year_transfer ||
						error.errorsData.emp_contract ||
						error.errorsData.sections ||
						error.errorsData.course_list ||
						error.errorsData.education_level ||
						error.errorsData.major_fields ||
						error.errorsData.minor_fields ||
						error.errorsData.pedagogical_training ||
						error.errorsData.salary ||
						error.errorsData.currency ||
						error.errorsData.title ||
						error.errorsData.is_teaching_license ||
						error.errorsData.continue_prof_dev ||
						error.errorsData.is_eng_development ||
						error.errorsData.is_basic_comp_course ||
						error.errorsData.is_coc ||
						error.errorsData.is_sci_tech_math_course ||
						error.errorsData.disability) &&
					(user === 'Teacher' || user === 'teacher')
				) {
					setBtnClickFlag(false);
					setKey('other');
				}
			}
		}
	}, [userResData, error]);

	useEffect(() => {
		let paramName = window.location.href.split('/').slice(-2)[0];
		let federalParamName = window.location.href.split('/').slice(-1)[0];
		let level = 100;
		if (paramName === 'regions') {
			level = 2;
		} else if (paramName === 'woreda') {
			level = 3;
		} else if (paramName === 'schools') {
			level = 4;
		} else if (federalParamName === 'federal') {
			level = 1;
		}

		dispatch(getRolesDataLevelWise(level));
		if (
			window.location.href.includes('users') ||
			window.location.href.includes('federal') ||
			window.location.href.includes('regions') ||
			window.location.href.includes('woreda') ||
			window.location.href.includes('schools')
		) {
			dispatch(getRegionsData());
		}
	}, []);

	useEffect(() => {
		let yesterday = new Date();
		yesterday.setDate(yesterday.getDate() - 1);
		var myDate = new Date(yesterday);
		let date = myDate.toLocaleString().split(',');
		let newDate = date[0].split('/'); //20/9/2021
		let month = newDate[0].charAt(1) ? newDate[0] : '0' + newDate[0];
		let getnewdate = newDate[1].charAt(1) ? newDate[1] : '0' + newDate[1];
		newDate = newDate[2] + '-' + month + '-' + getnewdate;
		// newDate = getnewdate+"-"+ month +"-"+newDate[2]
		setDates(newDate);
	});

	const rolesData = useSelector(
		(state) => state.rolesData.levelWiseRolesData
	);
	var { results } = rolesData;

	let allRoles = [];
	if (results) {
		results.map(function (value) {
			allRoles.push({ id: value.id, title: value.title });
			if (value.subroles.length > 0) {
				value.subroles.map(function (subRoleValue) {
					allRoles.push({
						id: subRoleValue.id,
						title: subRoleValue.title,
					});
				});
			}
		});
	}

	const regionData = useSelector(
		(state) => state.regionData.regionData.results
	);
	var regionResults = regionData;

	const regionChange = (e) => {
		dispatch(getRegionSpecificWoredasData(e.target.value));
	};

	const woredaData = useSelector(
		(state) => state.woredaData.regionSpecificWoredaData.results
	);
	var woredaResults = woredaData;
	console.log(woredaResults, 'result');

	const onChangeHandle = (e) => {
		setDisable1(true);
		setDisable2(true);
		let role = e.target.value.split(',');
		formRef.current.values.role = role[0];
		if (
			role[1] !== 'Student' &&
			role[1] !== 'student' &&
			role[1] !== 'Teacher' &&
			role[1] !== 'teacher'
		) {
			if (e.target.value !== '') {
				setuser('Other');
			} else {
				setuser('');
			}
		} else {
			setuser(role[1]);
		}
	};

	return (
		<>
			<Modal
				show={props.show}
				onHide={props.closeModal}
			>
				<Modal.Header closeButton>
					<Modal.Title>
						<h3>
							{user === 'Student' || user === 'student'
								? 'Add Student'
								: user === 'Teacher' || user === 'teacher'
								? ' Add Teacher'
								: ' Add User'}
						</h3>
						<p>
							{user === 'Student' || user === 'student'
								? 'Add Student'
								: user === 'Teacher' || user === 'teacher'
								? ' Add Teacher'
								: ' Add User'}{' '}
							individually
						</p>
						<Link
							className='close-modal-header'
							onClick={props.closeModal}
						>
							<img
								src={
									process.env.PUBLIC_URL +
									'/images/modal-close.svg'
								}
								alt='close'
							/>
						</Link>
					</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<Tabs
						onSelect={(k) => setKey(k)}
						activeKey={key}
						id='uncontrolled-tab-example'
						className='mb-0'
					>
						<Tab eventKey='Basic' title='Basic Data'>
							<Formik
								initialValues={{
									role: '',
									first_name: '',
									middle_name: '',
									last_name: '',
									phone_number: '',
									sex: '',
									citizenship: '',
									dob: '',
								}}
								validationSchema={
									user === 'Student' || user === 'student'
										? validationStudentSchema
										: user === 'Teacher' ||
										  user === 'teacher' ||
										  user === 'Other' ||
										  user === 'other'
										? validationTeacherSchema
										: ''
								}
								onSubmit={saveFirstData}
								innerRef={formRef}
							>
								{({ values, handleChange }) => {
									return (
										<Form className='modal-form-wrapper'>
											<div className='modal-form-wrapper user-form-wrapper'>
												<div className='uf-single'>
													<div className='uf-label'>
														Select Role
													</div>
													<div className='uf-field'>
														<select
															className='search-yazmi'
															onChange={
																onChangeHandle
															}
															name='role'
														>
															<option value=''>
																Select Role
															</option>
															{allRoles &&
																allRoles.map(
																	(
																		data,
																		key
																	) => (
																		<option
																			value={
																				data.id +
																				',' +
																				data.title
																			}
																		>
																			{
																				data.title
																			}
																		</option>
																	)
																)}
														</select>
													</div>
													{/* <div className="uf-field-link">
                          <Link>+ Create New Role</Link>
                        </div> */}
												</div>
												{user === 'Student' ||
												user === 'student' ? (
													<>
														<div className='uf-single'>
															<div className='uf-label'>
																First Name
															</div>
															<div className='uf-field'>
																<Field
																	type='text'
																	onKeyPress={(
																		event
																	) =>
																		(event.charCode >=
																			65 &&
																			event.charCode <=
																				90) ||
																		(event.charCode >=
																			97 &&
																			event.charCode <=
																				122)
																	}
																	name='first_name'
																	className='input-yazmi'
																	placeholder='Enter Student Name'
																	maxlength='50'
																/>
																{!error.errorsData ? (
																	<ErrorMessage
																		name='first_name'
																		component='div'
																		className='text-danger error_msg'
																	/>
																) : (
																	<span className='text-danger error_msg'>
																		{error.errorsData &&
																		error
																			.errorsData
																			.first_name
																			? error
																					.errorsData
																					.first_name
																			: error.errorsData &&
																			  error
																					.errorsData
																					.username
																			? error
																					.errorsData
																					.username
																			: ''}
																	</span>
																)}
															</div>
														</div>
														<div className='uf-single'>
															<div className='uf-label'>
																Father's Name
															</div>
															<div className='uf-field'>
																<Field
																	type='text'
																	onKeyPress={(
																		event
																	) =>
																		(event.charCode >=
																			65 &&
																			event.charCode <=
																				90) ||
																		(event.charCode >=
																			97 &&
																			event.charCode <=
																				122)
																	}
																	name='middle_name'
																	className='input-yazmi'
																	placeholder='Enter Father Name'
																	maxlength='50'
																/>
																{!error.errorsData ? (
																	<ErrorMessage
																		name='middle_name'
																		component='div'
																		className='text-danger error_msg'
																	/>
																) : (
																	<span className='text-danger error_msg'>
																		{error.errorsData &&
																		error
																			.errorsData
																			.middle_name
																			? error
																					.errorsData
																					.middle_name
																			: ''}
																	</span>
																)}
															</div>
														</div>
														<div className='uf-single'>
															<div className='uf-label'>
																Grandfather's
																Name
															</div>
															<div className='uf-field'>
																<Field
																	type='text'
																	onKeyPress={(
																		event
																	) =>
																		(event.charCode >=
																			65 &&
																			event.charCode <=
																				90) ||
																		(event.charCode >=
																			97 &&
																			event.charCode <=
																				122)
																	}
																	name='last_name'
																	className='input-yazmi'
																	placeholder='Enter Grand Father Name'
																	maxlength='50'
																/>
																{!error.errorsData ? (
																	<ErrorMessage
																		name='last_name'
																		component='div'
																		className='text-danger error_msg'
																	/>
																) : (
																	<span className='text-danger error_msg'>
																		{error.errorsData &&
																		error
																			.errorsData
																			.last_name
																			? error
																					.errorsData
																					.last_name
																			: ''}
																	</span>
																)}
															</div>
														</div>
														<div className='uf-single'>
															<div className='uf-label'>
																Phone Number
															</div>
															<div className='uf-field'>
																<Field
																	type='text'
																	className='input-yazmi appearance_none'
																	placeholder='Enter Phone Number'
																	name='phone_number'
																/>
																{!error.errorsData ? (
																	<ErrorMessage
																		name='phone_number'
																		component='div'
																		className='text-danger error_msg'
																	/>
																) : (
																	<span className='text-danger error_msg'>
																		{error.errorsData &&
																		error
																			.errorsData
																			.phone_number
																			? error
																					.errorsData
																					.phone_number
																			: ''}
																	</span>
																)}
															</div>
														</div>
														{user !== '' ? (
															<div className='modal-form-cta'>
																<button className='btn-primary-yazmi'>
																	Save
																</button>
																<button
																	type='button'
																	className='btn-secondary-yazmi'
																	onClick={
																		props.closeModal
																	}
																>
																	Cancel
																</button>
															</div>
														) : (
															<></>
														)}
													</>
												) : user === 'Teacher' ||
												  user === 'teacher' ||
												  user === 'Other' ||
												  user === 'other' ? (
													<>
														<div className='uf-single'>
															<div className='uf-label'>
																First Name
															</div>
															<div className='uf-field'>
																<Field
																	type='text'
																	onKeyPress={(
																		event
																	) =>
																		(event.charCode >=
																			65 &&
																			event.charCode <=
																				90) ||
																		(event.charCode >=
																			97 &&
																			event.charCode <=
																				122)
																	}
																	name='first_name'
																	className='input-yazmi'
																	placeholder={
																		user ===
																			'Teacher' ||
																		user ===
																			'teacher'
																			? 'Enter Teacher Name'
																			: 'Enter Name'
																	}
																	maxlength='50'
																/>
																{!error.errorsData ? (
																	<ErrorMessage
																		name='first_name'
																		component='div'
																		className='text-danger error_msg'
																	/>
																) : (
																	<span className='text-danger error_msg'>
																		{error.errorsData &&
																		error
																			.errorsData
																			.first_name
																			? error
																					.errorsData
																					.first_name
																			: error.errorsData &&
																			  error
																					.errorsData
																					.username
																			? error
																					.errorsData
																					.username
																			: ''}
																	</span>
																)}
															</div>
														</div>
														<div className='uf-single'>
															<div className='uf-label'>
																Father's Name
															</div>
															<div className='uf-field'>
																<Field
																	type='text'
																	onKeyPress={(
																		event
																	) =>
																		(event.charCode >=
																			65 &&
																			event.charCode <=
																				90) ||
																		(event.charCode >=
																			97 &&
																			event.charCode <=
																				122)
																	}
																	name='middle_name'
																	className='input-yazmi'
																	placeholder='Enter Father Name'
																	maxlength='50'
																/>
																{!error.errorsData ? (
																	<ErrorMessage
																		name='middle_name'
																		component='div'
																		className='text-danger error_msg'
																	/>
																) : (
																	<span className='text-danger error_msg'>
																		{error.errorsData &&
																		error
																			.errorsData
																			.middle_name
																			? error
																					.errorsData
																					.middle_name
																			: ''}
																	</span>
																)}
															</div>
														</div>
														<div className='uf-single'>
															<div className='uf-label'>
																Grandfather's
																Name
															</div>
															<div className='uf-field'>
																<Field
																	type='text'
																	onKeyPress={(
																		event
																	) =>
																		(event.charCode >=
																			65 &&
																			event.charCode <=
																				90) ||
																		(event.charCode >=
																			97 &&
																			event.charCode <=
																				122)
																	}
																	name='last_name'
																	className='input-yazmi'
																	placeholder='Enter Grand Father Name'
																	maxlength='50'
																/>
																{!error.errorsData ? (
																	<ErrorMessage
																		name='last_name'
																		component='div'
																		className='text-danger error_msg'
																	/>
																) : (
																	<span className='text-danger error_msg'>
																		{error.errorsData &&
																		error
																			.errorsData
																			.last_name
																			? error
																					.errorsData
																					.last_name
																			: ''}
																	</span>
																)}
															</div>
														</div>
														<div className='uf-single'>
															<div className='uf-label'>
																Sex
															</div>
															<div className='uf-field'>
																<select
																	className='search-yazmi'
																	name='sex'
																	onChange={
																		handleChange
																	}
																	value={
																		values.sex
																	}
																>
																	<option value=''>
																		Select
																		Gender
																	</option>
																	<option value='MALE'>
																		Male
																	</option>
																	<option value='FEMALE'>
																		Female
																	</option>
																</select>
																{!error.errorsData ? (
																	<ErrorMessage
																		name='sex'
																		component='div'
																		className='text-danger error_msg'
																	/>
																) : (
																	<span className='text-danger error_msg'>
																		{error.errorsData &&
																		error
																			.errorsData
																			.sex
																			? error
																					.errorsData
																					.sex
																			: ''}
																	</span>
																)}
															</div>
														</div>
														<div className='uf-single'>
															<div className='uf-label'>
																Citizenship
															</div>
															<div className='uf-field'>
																<select
																	className='search-yazmi'
																	name='citizenship'
																	onChange={
																		handleChange
																	}
																	value={
																		values.citizenship
																	}
																>
																	<option value=''>
																		Select
																		Citizenship
																	</option>
																	<option value='ETHIOPIAN'>
																		Ethiopian
																	</option>
																	<option value='FOREIGNER'>
																		Foreigner
																	</option>
																</select>
																{!error.errorsData ? (
																	<ErrorMessage
																		name='citizenship'
																		component='div'
																		className='text-danger error_msg'
																	/>
																) : (
																	<span className='text-danger error_msg'>
																		{error.errorsData &&
																		error
																			.errorsData
																			.citizenship
																			? error
																					.errorsData
																					.citizenship
																			: ''}
																	</span>
																)}
															</div>
														</div>
														<div className='uf-single'>
															<div className='uf-label'>
																Date of Birth
															</div>
															<div className='uf-field'>
																<input
																	id='date_id'
																	type='date'
																	className='input-yazmi'
																	placeholder='Enter birth date'
																	name='dob'
																	onChange={
																		handleChange
																	}
																	value={
																		values.dob
																	}
																	max={date}
																/>
																{/* <DatePicker className="input-yazmi" placeholderText="dddd" selected={startDate} onChange={(date) => setStartDate(date)} maxDate={startDate} /> */}
																{!error.errorsData ? (
																	<ErrorMessage
																		name='dob'
																		component='div'
																		className='text-danger error_msg dob'
																	/>
																) : (
																	<span className='text-danger error_msg'>
																		{error.errorsData &&
																		error
																			.errorsData
																			.dob
																			? error
																					.errorsData
																					.dob
																			: ''}
																	</span>
																)}
															</div>
														</div>
														<div className='uf-single'>
															<div className='uf-label'>
																Phone Number
															</div>
															<div className='uf-field'>
																<Field
																	type='text'
																	className='input-yazmi appearance_none'
																	placeholder='Enter Phone Number'
																	name='phone_number'
																/>
																{!error.errorsData ? (
																	<ErrorMessage
																		name='phone_number'
																		component='div'
																		className='text-danger error_msg'
																	/>
																) : (
																	<span className='text-danger error_msg'>
																		{error.errorsData &&
																		error
																			.errorsData
																			.phone_number
																			? error
																					.errorsData
																					.phone_number
																			: ''}
																	</span>
																)}
															</div>
														</div>
														{user !== '' ? (
															<div className='modal-form-cta'>
																<button className='btn-primary-yazmi'>
																	Save
																</button>
																<button
																	type='button'
																	className='btn-secondary-yazmi'
																	onClick={
																		props.closeModal
																	}
																>
																	Cancel
																</button>
															</div>
														) : (
															<></>
														)}
													</>
												) : (
													<></>
												)}
											</div>
										</Form>
									);
								}}
							</Formik>
						</Tab>
						<Tab
							eventKey='Location'
							title='Location Address'
							disabled={disable1}
						>
							<Formik
								initialValues={{
									address: '',
									region: regionId,
									woreda: woredaId,
									city: '',
									kebele: '',
								}}
								validationSchema={
									validationSchemaForLocationTab
								}
								onSubmit={
									user === 'Other' || user === 'Other'
										? saveAllData
										: saveLocationData
								}
								innerRef={form1Ref}
							>
								{({ values, handleChange, setFieldValue }) => {
									return (
										<Form className='modal-form-wrapper'>
											<div className='modal-form-wrapper user-form-wrapper'>
												<div className='uf-single'>
													<div className='uf-label'>
														Address
													</div>
													<div className='uf-field'>
														<textarea
															rows='5'
															cols='50'
															className='input-yazmi'
															placeholder='Student Address'
															name='address'
															maxlength='250'
															onChange={
																handleChange
															}
															value={
																values.address
															}
														/>
														{!error.errorsData ? (
															<ErrorMessage
																name='address'
																component='div'
																className='text-danger error_msg'
															/>
														) : (
															<span className='text-danger error_msg'>
																{error.errorsData &&
																error.errorsData
																	.address
																	? error
																			.errorsData
																			.address
																	: ''}
															</span>
														)}
													</div>
												</div>
												<div className='uf-single'>
													<div className='uf-label'>
														Region
													</div>
													<div className='uf-field'>
														<select
															className='search-yazmi'
															onChange={(e) => {
																// handleChange();
																setFieldValue(
																	'woreda',
																	''
																);
																setFieldValue(
																	'region',
																	e.target
																		.value
																);
																regionChange(e);
															}}
															name='region'
															value={
																values.region
															}
														>
															<option value=''>
																Select Region
															</option>
															{regionResults &&
																regionResults.map(
																	(
																		data,
																		key
																	) => (
																		<option
																			value={
																				data.id
																			}
																		>
																			{
																				data.name
																			}
																		</option>
																	)
																)}
														</select>
														{!error.errorsData ? (
															<ErrorMessage
																name='region'
																component='div'
																className='text-danger error_msg'
															/>
														) : (
															<span className='text-danger error_msg'>
																{error.errorsData &&
																error.errorsData
																	.region
																	? error
																			.errorsData
																			.region
																	: ''}
															</span>
														)}
													</div>
												</div>
												<div className='uf-single'>
													<div className='uf-label'>
														City
													</div>
													<div className='uf-field'>
														<Field
															type='text'
															name='city'
															className='input-yazmi'
															placeholder='Enter city'
															maxlength='250'
														/>
														{!error.errorsData ? (
															<></>
														) : (
															<span className='text-danger error_msg'>
																{error.errorsData &&
																error.errorsData
																	.city
																	? error
																			.errorsData
																			.city
																	: ''}
															</span>
														)}
													</div>
												</div>
												<div className='uf-single'>
													<div className='uf-label'>
														Woreda
													</div>
													<div className='uf-field'>
														<select
															className='search-yazmi'
															onChange={
																handleChange
															}
															name='woreda'
															value={
																values.woreda
															}
														>
															<option value=''>
																Select Woreda
															</option>
															{woredaResults &&
																values.region &&
																woredaResults.map(
																	(
																		data,
																		key
																	) => (
																		<option
																			value={
																				data.id
																			}
																		>
																			{
																				data.name
																			}
																		</option>
																	)
																)}
														</select>
														{!error.errorsData ? (
															<ErrorMessage
																name='woreda'
																component='div'
																className='text-danger error_msg'
															/>
														) : (
															<span className='text-danger error_msg'>
																{error.errorsData &&
																error.errorsData
																	.woreda
																	? error
																			.errorsData
																			.woreda
																	: ''}
															</span>
														)}
													</div>
												</div>
												<div className='uf-single'>
													<div className='uf-label'>
														Kebele
													</div>
													<div className='uf-field'>
														<Field
															type='text'
															name='kebele'
															className='input-yazmi'
															placeholder='Enter kebele'
															maxlength='250'
														/>
														{!error.errorsData ? (
															<></>
														) : (
															<span className='text-danger error_msg'>
																{error.errorsData &&
																error.errorsData
																	.kebele
																	? error
																			.errorsData
																			.kebele
																	: ''}
															</span>
														)}
													</div>
												</div>
												{user !== '' &&
												(user === 'Teacher' ||
													user === 'teaher' ||
													user === 'Student' ||
													user === 'student') ? (
													<div className='modal-form-cta'>
														<button className='btn-primary-yazmi'>
															Save
														</button>
														<button
															type='button'
															className='btn-secondary-yazmi'
															onClick={
																props.closeModal
															}
														>
															Cancel
														</button>
													</div>
												) : user !== '' &&
												  (user === 'Other' ||
														user === 'other') ? (
													<div className='modal-form-cta'>
														<button
															className={
																loading
																	? 'btn-primary-yazmi button_disable'
																	: 'btn-primary-yazmi'
															}
															disabled={
																loading
																	? true
																	: false
															}
														>
															Save
														</button>
														<button
															type='button'
															className='btn-secondary-yazmi'
															onClick={
																props.closeModal
															}
														>
															Cancel
														</button>
													</div>
												) : (
													<></>
												)}
											</div>
										</Form>
									);
								}}
							</Formik>
						</Tab>
						{user !== 'Other' ? (
							<Tab
								eventKey='other'
								title={
									user === 'Teacher' || user === 'teacher' ? (
										'Employment Information'
									) : user === 'Student' ||
									  user === 'student' ? (
										'Optional'
									) : (
										<></>
									)
								}
								disabled={disable2}
							>
								<div className='modal-form-wrapper user-form-wrapper'>
									{user === 'Student' ||
									user === 'student' ? (
										<>
											<Formik
												initialValues={{
													sex1: '',
													marital_status: '',
													enrollment: '',
													dob1: '',
													citizenship1: '',
													emp_year: '',
													emp_year_teacher: '',
													emp_year_transfer: '',
													emp_contract: '',
													sections: '',
													course_list: '',
													education_level: '',
													major_fields: '',
													minor_fields: '',
													pedagogical_training: '',
													salary: '',
													currency: '',
													title: '',
													is_teaching_license: '',
													continue_prof_dev: '',
													is_eng_development: '',
													is_basic_comp_course: '',
													is_coc: '',
													is_sci_tech_math_course: '',
													disability: '',
												}}
												validationSchema={
													validationStudentSchemaForOptionalTab
												}
												onSubmit={saveAllData}
												innerRef={form2Ref}
											>
												{({ values, handleChange }) => {
													return (
														<Form className='modal-form-wrapper'>
															<div className='uf-single'>
																<div className='uf-label'>
																	Sex
																</div>
																<div className='uf-field'>
																	<select
																		className='search-yazmi'
																		name='sex1'
																		onChange={
																			handleChange
																		}
																		value={
																			values.sex1
																		}
																	>
																		<option value=''>
																			Select
																			Gender
																		</option>
																		<option value='MALE'>
																			Male
																		</option>
																		<option value='FEMALE'>
																			Female
																		</option>
																	</select>
																	{!error.errorsData ? (
																		<ErrorMessage
																			name='sex1'
																			component='div'
																			className='text-danger error_msg'
																		/>
																	) : (
																		<span className='text-danger error_msg'>
																			{error.errorsData &&
																			error
																				.errorsData
																				.sex1
																				? error
																						.errorsData
																						.sex1
																				: ''}
																		</span>
																	)}
																</div>
															</div>
															<div className='uf-single'>
																<div className='uf-label'>
																	Marital
																	Status
																</div>
																<div className='uf-field'>
																	<select
																		className='search-yazmi'
																		name='marital_status'
																		onChange={
																			handleChange
																		}
																		value={
																			values.marital_status
																		}
																	>
																		<option value=''>
																			Select
																			Status
																		</option>
																		<option value='MARRIED'>
																			Married
																		</option>
																		<option value='UNMARRIED'>
																			Not
																			married
																		</option>
																		<option value='DIVORCED'>
																			Divorced
																		</option>
																		<option value='WIDOW'>
																			Widow/
																			widower
																		</option>
																	</select>
																	{!error.errorsData ? (
																		<ErrorMessage
																			name='marital_status'
																			component='div'
																			className='text-danger error_msg'
																		/>
																	) : (
																		<span className='text-danger error_msg'>
																			{error.errorsData &&
																			error
																				.errorsData
																				.marital_status
																				? error
																						.errorsData
																						.marital_status
																				: ''}
																		</span>
																	)}
																</div>
															</div>
															<div className='uf-single'>
																<div className='uf-label'>
																	Enrollment
																	Type/
																	<br />
																	Student Type
																	**
																</div>
																<div className='uf-field'>
																	<Field
																		type='text'
																		name='enrollment'
																		className='input-yazmi'
																		placeholder='Enter type'
																		maxlength='250'
																	/>
																	{!error.errorsData ? (
																		<></>
																	) : (
																		<span className='text-danger error_msg'>
																			{error.errorsData &&
																			error
																				.errorsData
																				.enrollment
																				? error
																						.errorsData
																						.enrollment
																				: ''}
																		</span>
																	)}
																</div>
															</div>
															<div className='uf-single'>
																<div className='uf-label'>
																	Date of
																	Birth{' '}
																</div>
																<div className='uf-field'>
																	<input
																		id='date_id'
																		type='date'
																		className='input-yazmi'
																		placeholder='Enter birth date'
																		name='dob1'
																		max={
																			date
																		}
																		onChange={
																			handleChange
																		}
																		value={
																			values.dob
																		}
																	/>
																	{/* <DatePicker selected={startDate} onChange={(date) => setStartDate(date)} /> */}
																	{!error.errorsData ? (
																		<ErrorMessage
																			name='dob1'
																			component='div'
																			className='text-danger error_msg dob'
																		/>
																	) : (
																		<span className='text-danger error_msg'>
																			{error.errorsData &&
																			error
																				.errorsData
																				.dob1
																				? error
																						.errorsData
																						.dob1
																				: ''}
																		</span>
																	)}
																</div>
															</div>
															<div className='uf-single'>
																<div className='uf-label'>
																	Citzenship{' '}
																</div>
																<div className='uf-field'>
																	<select
																		className='search-yazmi'
																		name='citizenship1'
																		onChange={
																			handleChange
																		}
																		value={
																			values.citizenship1
																		}
																	>
																		<option value=''>
																			Select
																			Citizenship
																		</option>
																		<option value='ETHIOPIAN'>
																			Ethiopian
																		</option>
																		<option value='FOREIGNER'>
																			Foreigner
																		</option>
																	</select>
																	{!error.errorsData ? (
																		<ErrorMessage
																			name='citizenship1'
																			component='div'
																			className='text-danger error_msg'
																		/>
																	) : (
																		<span className='text-danger error_msg'>
																			{error.errorsData &&
																			error
																				.errorsData
																				.citizenship1
																				? error
																						.errorsData
																						.citizenship1
																				: ''}
																		</span>
																	)}
																</div>
															</div>
															<div className='uf-single'>
																<div className='uf-label'>
																	Disability
																	Status
																</div>
																<div className='uf-field'>
																	<select
																		className='search-yazmi'
																		name='disability'
																		onChange={
																			handleChange
																		}
																		value={
																			values.disability
																		}
																	>
																		<option value=''>
																			Select
																			Disability
																		</option>
																		<option value='BLIND'>
																			Blind
																		</option>
																		<option value='DEAF'>
																			Deaf
																		</option>
																		<option value='NONDISABLE'>
																			Non-disabled{' '}
																		</option>
																		<option value='OTHER'>
																			Other
																		</option>
																	</select>
																	{!error.errorsData ? (
																		<ErrorMessage
																			name='disability'
																			component='div'
																			className='text-danger error_msg'
																		/>
																	) : (
																		<span className='text-danger error_msg'>
																			{error.errorsData &&
																			error
																				.errorsData
																				.disability
																				? error
																						.errorsData
																						.disability
																				: ''}
																		</span>
																	)}
																</div>
															</div>
															{user !== '' ? (
																<div className='modal-form-cta'>
																	<button
																		className={
																			loading
																				? 'btn-primary-yazmi button_disable'
																				: 'btn-primary-yazmi'
																		}
																		disabled={
																			loading
																				? true
																				: false
																		}
																	>
																		Save
																	</button>
																	<button
																		type='button'
																		className='btn-secondary-yazmi'
																		onClick={
																			props.closeModal
																		}
																	>
																		Cancel
																	</button>
																</div>
															) : (
																<></>
															)}
														</Form>
													);
												}}
											</Formik>
										</>
									) : user === 'Teacher' ||
									  user === 'teacher' ? (
										<>
											<Formik
												initialValues={{
													sex1: '',
													marital_status: '',
													enrollment: '',
													dob1: '',
													citizenship1: '',
													emp_year: '',
													emp_year_teacher: '',
													emp_year_transfer: '',
													emp_contract: '',
													sections: '',
													course_list: '',
													education_level: '',
													major_fields: '',
													minor_fields: '',
													pedagogical_training: '',
													salary: '',
													currency: '',
													title: '',
													is_teaching_license: '',
													continue_prof_dev: '',
													is_eng_development: '',
													is_basic_comp_course: '',
													is_coc: '',
													is_sci_tech_math_course: '',
													disability: '',
												}}
												validationSchema={
													validationTeacherSchemaForOtherTab
												}
												onSubmit={saveAllData}
												innerRef={form2Ref}
											>
												{({ values, handleChange }) => {
													return (
														<Form className='modal-form-wrapper'>
															<div className='uf-single uf-single'>
																<div className='uf-label'>
																	Year of
																	Employment{' '}
																</div>
																<div className='uf-field'>
																	<Field
																		type='number'
																		className='input-yazmi appearance_none'
																		placeholder='Employment Year'
																		name='emp_year'
																	/>
																	{!error.errorsData ? (
																		<></>
																	) : (
																		<span className='text-danger error_msg'>
																			{error.errorsData &&
																			error
																				.errorsData
																				.emp_year
																				? error
																						.errorsData
																						.emp_year
																				: ''}
																		</span>
																	)}
																</div>
															</div>
															<div className='uf-single uf-single'>
																<div className='uf-label'>
																	Year of
																	Employment
																	as a teacher{' '}
																</div>
																<div className='uf-field'>
																	<Field
																		type='number'
																		className='input-yazmi appearance_none'
																		placeholder='Employment Year As a teacher'
																		name='emp_year_teacher'
																	/>
																	{!error.errorsData ? (
																		<></>
																	) : (
																		<span className='text-danger error_msg'>
																			{error.errorsData &&
																			error
																				.errorsData
																				.emp_year_teacher
																				? error
																						.errorsData
																						.emp_year_teacher
																				: ''}
																		</span>
																	)}
																</div>
															</div>
															<div className='uf-single uf-single'>
																<div className='uf-label'>
																	Employment
																	Year as a
																	transfer{' '}
																</div>
																<div className='uf-field'>
																	<Field
																		type='number'
																		className='input-yazmi appearance_none'
																		placeholder='Employment Year As a transfer'
																		name='emp_year_transfer'
																	/>
																	{!error.errorsData ? (
																		<></>
																	) : (
																		<span className='text-danger error_msg'>
																			{error.errorsData &&
																			error
																				.errorsData
																				.emp_year_transfer
																				? error
																						.errorsData
																						.emp_year_transfer
																				: ''}
																		</span>
																	)}
																</div>
															</div>
															<div className='uf-single uf-single'>
																<div className='uf-label'>
																	Employment
																	Contract{' '}
																</div>
																<div className='uf-field'>
																	<select
																		className='search-yazmi'
																		name='emp_contract'
																		onChange={
																			handleChange
																		}
																		value={
																			values.emp_contract
																		}
																	>
																		<option value=''>
																			Select
																			Employment
																			Contract
																		</option>
																		<option value='PERMANENT'>
																			Permanent
																		</option>
																		<option value='CONTRACT'>
																			Contract
																			Worker
																		</option>
																	</select>
																	{!error.errorsData ? (
																		<ErrorMessage
																			name='emp_contract'
																			component='div'
																			className='text-danger error_msg'
																		/>
																	) : (
																		<span className='text-danger error_msg'>
																			{error.errorsData &&
																			error
																				.errorsData
																				.emp_contract
																				? error
																						.errorsData
																						.emp_contract
																				: ''}
																		</span>
																	)}
																</div>
															</div>
															<div className='uf-single uf-single'>
																<div className='uf-label'>
																	Number of
																	Sections
																	from Grade
																	9-12{' '}
																</div>
																<div className='uf-field'>
																	<Field
																		type='number'
																		className='input-yazmi appearance_none'
																		placeholder='Number of sections'
																		name='sections'
																	/>
																	{!error.errorsData ? (
																		<></>
																	) : (
																		<span className='text-danger error_msg'>
																			{error.errorsData &&
																			error
																				.errorsData
																				.sections
																				? error
																						.errorsData
																						.sections
																				: ''}
																		</span>
																	)}
																</div>
															</div>
															<div className='uf-single uf-single'>
																<div className='uf-label'>
																	Assigned
																	Course List{' '}
																</div>
																<div className='uf-field'>
																	<Field
																		type='text'
																		name='course_list'
																		className='input-yazmi'
																		placeholder='Assigned Course List'
																		maxlength='250'
																	/>
																	{!error.errorsData ? (
																		<></>
																	) : (
																		<span className='text-danger error_msg'>
																			{error.errorsData &&
																			error
																				.errorsData
																				.course_list
																				? error
																						.errorsData
																						.course_list
																				: ''}
																		</span>
																	)}
																</div>
															</div>
															<div className='uf-single uf-single'>
																<div className='uf-label'>
																	Education
																	Level{' '}
																</div>
																<div className='uf-field'>
																	<select
																		className='search-yazmi'
																		name='education_level'
																		onChange={
																			handleChange
																		}
																		value={
																			values.education_level
																		}
																	>
																		<option value=''>
																			Select
																			Education
																			Level
																		</option>
																		<option value='CERTIFICATE'>
																			Certificate
																		</option>
																		<option value='DIFFERENT_FROM_TCC'>
																			Different
																			from
																			TCC
																		</option>
																		<option value='TCC_DIPLOMA'>
																			TCC
																			diploma
																		</option>
																		<option value='CLUSTER_TCC_DIPLOMA'>
																			Cluster
																			TCC
																			diploma
																		</option>
																		<option value='LINEAR'>
																			Linear
																		</option>
																		<option value='GENERALIST'>
																			Generalist
																		</option>
																		<option value='SPECIALIST'>
																			Specialist
																		</option>
																		<option value='APPLIED'>
																			Applied
																		</option>
																		<option value='LEVEL_3'>
																			Level
																			3
																		</option>
																		<option value='LEVEL_4'>
																			Level
																			4
																		</option>
																		<option value='LEVEL_5'>
																			Level
																			5
																		</option>
																		<option value='BA_BSC_BED'>
																			BA/BSC/BED
																		</option>
																		<option value='MA_MS'>
																			MA/MS
																		</option>
																		<option value='PHD'>
																			PhD
																		</option>
																		<option value='OTHER'>
																			Other
																		</option>
																	</select>
																	{!error.errorsData ? (
																		<ErrorMessage
																			name='education_level'
																			component='div'
																			className='text-danger error_msg'
																		/>
																	) : (
																		<span className='text-danger error_msg'>
																			{error.errorsData &&
																			error
																				.errorsData
																				.education_level
																				? error
																						.errorsData
																						.education_level
																				: ''}
																		</span>
																	)}
																</div>
															</div>
															<div className='uf-single uf-single'>
																<div className='uf-label'>
																	Major Field{' '}
																</div>
																<div className='uf-field'>
																	<select
																		className='search-yazmi'
																		name='major_fields'
																		onChange={
																			handleChange
																		}
																		value={
																			values.major_fields
																		}
																	>
																		<option value=''>
																			Select
																			Major
																			Fields
																		</option>
																		<option value='MATHEMATICS'>
																			Mathematics
																		</option>
																		<option value='ENGLISH'>
																			English
																		</option>
																		<option value='AMHARIC'>
																			Amharic
																		</option>
																		<option value='FIRST_LANGUAGE'>
																			First
																			language
																		</option>
																		<option value='CHEMISTRY'>
																			Chemistry
																		</option>
																		<option value='PHYSICS'>
																			Physics
																		</option>
																		<option value='BIOLOGY'>
																			Biology
																		</option>
																		<option value='GEOGRAPHY'>
																			Geography
																		</option>
																		<option value='HISTORY'>
																			History
																		</option>
																		<option value='CIVICS'>
																			Civics
																		</option>
																		<option value='SPORTS'>
																			Sports
																		</option>
																		<option value='IT'>
																			IT
																		</option>
																		<option value='ECONOMICS'>
																			Economics
																		</option>
																		<option value='TECHNICAL_DRAWING'>
																			Technical
																			drawing
																		</option>
																		<option value='USINESS'>
																			Business
																		</option>
																		<option value='ACCOUNTING'>
																			Accounting
																		</option>
																		<option value='EDPM'>
																			Edpm
																		</option>
																		<option value='SPECIAL_NEED_EDUCATION'>
																			Special
																			need
																			education
																		</option>
																		<option value='SIGN_LANGUAGE'>
																			Sign
																			language
																		</option>
																		<option value='APPLIED'>
																			Applied
																		</option>
																		<option value='OTHER'>
																			Other
																		</option>
																	</select>
																	{!error.errorsData ? (
																		<ErrorMessage
																			name='major_fields'
																			component='div'
																			className='text-danger error_msg'
																		/>
																	) : (
																		<span className='text-danger error_msg'>
																			{error.errorsData &&
																			error
																				.errorsData
																				.major_fields
																				? error
																						.errorsData
																						.major_fields
																				: ''}
																		</span>
																	)}
																</div>
															</div>
															<div className='uf-single uf-single'>
																<div className='uf-label'>
																	Minor Field{' '}
																</div>
																<div className='uf-field'>
																	<select
																		className='search-yazmi'
																		name='minor_fields'
																		onChange={
																			handleChange
																		}
																		value={
																			values.minor_fields
																		}
																	>
																		<option value=''>
																			Select
																			Minor
																			Fields
																		</option>
																		<option value='MATHEMATICS'>
																			Mathematics
																		</option>
																		<option value='ENGLISH'>
																			English
																		</option>
																		<option value='AMHARIC'>
																			Amharic
																		</option>
																		<option value='FIRST_LANGUAGE'>
																			First
																			language
																		</option>
																		<option value='CHEMISTRY'>
																			Chemistry
																		</option>
																		<option value='PHYSICS'>
																			Physics
																		</option>
																		<option value='BIOLOGY'>
																			Biology
																		</option>
																		<option value='GEOGRAPHY'>
																			Geography
																		</option>
																		<option value='HISTORY'>
																			History
																		</option>
																		<option value='CIVICS'>
																			Civics
																		</option>
																		<option value='SPORTS'>
																			Sports
																		</option>
																		<option value='IT'>
																			IT
																		</option>
																		<option value='ECONOMICS'>
																			Economics
																		</option>
																		<option value='TECHNICAL_DRAWING'>
																			Technical
																			drawing
																		</option>
																		<option value='USINESS'>
																			Business
																		</option>
																		<option value='ACCOUNTING'>
																			Accounting
																		</option>
																		<option value='EDPM'>
																			Edpm
																		</option>
																		<option value='SPECIAL_NEED_EDUCATION'>
																			Special
																			need
																			education
																		</option>
																		<option value='SIGN_LANGUAGE'>
																			Sign
																			language
																		</option>
																		<option value='APPLIED'>
																			Applied
																		</option>
																		<option value='OTHER'>
																			Other
																		</option>
																	</select>
																	{!error.errorsData ? (
																		<ErrorMessage
																			name='minor_fields'
																			component='div'
																			className='text-danger error_msg'
																		/>
																	) : (
																		<span className='text-danger error_msg'>
																			{error.errorsData &&
																			error
																				.errorsData
																				.minor_fields
																				? error
																						.errorsData
																						.minor_fields
																				: ''}
																		</span>
																	)}
																</div>
															</div>
															<div className='uf-single uf-single'>
																<div className='uf-label'>
																	Pedagogical
																	Training{' '}
																</div>
																<div className='uf-field'>
																	<select
																		className='search-yazmi'
																		name='pedagogical_training'
																		onChange={
																			handleChange
																		}
																		value={
																			values.pedagogical_training
																		}
																	>
																		<option value=''>
																			Select
																			Pedagogical
																			Training
																		</option>
																		<option value='BED'>
																			BED
																		</option>
																		<option value='BSC'>
																			BSC
																		</option>
																		<option value='BA'>
																			BA
																		</option>
																		<option value='PGDT'>
																			PGDT
																		</option>
																		<option value='NONE'>
																			None
																		</option>
																	</select>
																	{!error.errorsData ? (
																		<ErrorMessage
																			name='pedagogical_training'
																			component='div'
																			className='text-danger error_msg'
																		/>
																	) : (
																		<span className='text-danger error_msg'>
																			{error.errorsData &&
																			error
																				.errorsData
																				.pedagogical_training
																				? error
																						.errorsData
																						.pedagogical_training
																				: ''}
																		</span>
																	)}
																</div>
															</div>
															<div className='uf-single uf-single'>
																<div className='uf-label'>
																	Salary{' '}
																</div>
																<div className='uf-field'>
																	<Field
																		type='number'
																		className='input-yazmi appearance_none'
																		name='salary'
																		placeholder='Salary'
																	/>
																	{!error.errorsData ? (
																		<ErrorMessage
																			name='salary'
																			component='div'
																			className='text-danger error_msg'
																		/>
																	) : (
																		<span className='text-danger error_msg'>
																			{error.errorsData &&
																			error
																				.errorsData
																				.salary
																				? error
																						.errorsData
																						.salary
																				: ''}
																		</span>
																	)}
																</div>
															</div>
															<div className='uf-single uf-single'>
																<div className='uf-label'>
																	Currency{' '}
																</div>
																<div className='uf-field'>
																	<Field
																		type='text'
																		className='input-yazmi'
																		name='currency'
																		placeholder='Currency'
																	/>
																	{!error.errorsData ? (
																		<ErrorMessage
																			name='currency'
																			component='div'
																			className='text-danger error_msg'
																		/>
																	) : (
																		<span className='text-danger error_msg'>
																			{error.errorsData &&
																			error
																				.errorsData
																				.currency
																				? error
																						.errorsData
																						.currency
																				: ''}
																		</span>
																	)}
																</div>
															</div>
															<div className='uf-single uf-single'>
																<div className='uf-label'>
																	Title{' '}
																</div>
																<div className='uf-field'>
																	<select
																		className='search-yazmi'
																		name='title'
																		onChange={
																			handleChange
																		}
																		value={
																			values.title
																		}
																	>
																		<option value=''>
																			Select
																			Title
																		</option>
																		<option value='BEGINNER'>
																			Beginner
																		</option>
																		<option value='JUNIOR'>
																			Junior
																		</option>
																		<option value='TEACHER'>
																			Teacher
																		</option>
																		<option value='SENIOR'>
																			Senior
																		</option>
																		<option value='ASSOCIATE_LEADER'>
																			Associate
																			leader
																		</option>
																		<option value='LEADING_TEACHER'>
																			Leading
																			teacher
																		</option>
																		<option value='SENIOR_LECTURER'>
																			Senior
																			lecturer
																		</option>
																		<option value='SENIOR_LECTURER_II'>
																			Senior
																			lecturer
																			II
																		</option>
																		<option value='SENIOR_LECTURER_III'>
																			Senior
																			lecturer
																			III
																		</option>
																		<option value='NO_TITLE'>
																			No
																			title
																		</option>
																	</select>
																	{!error.errorsData ? (
																		<ErrorMessage
																			name='title'
																			component='div'
																			className='text-danger error_msg'
																		/>
																	) : (
																		<span className='text-danger error_msg'>
																			{error.errorsData &&
																			error
																				.errorsData
																				.title
																				? error
																						.errorsData
																						.title
																				: ''}
																		</span>
																	)}
																</div>
															</div>
															<div className='uf-single uf-single'>
																<div className='uf-label'>
																	Teaching
																	License{' '}
																</div>
																<div className='uf-field'>
																	<select
																		className='search-yazmi'
																		name='is_teaching_license'
																		onChange={
																			handleChange
																		}
																		value={
																			values.is_teaching_license
																		}
																	>
																		<option value=''>
																			Select
																			Teaching
																			License
																		</option>
																		<option value='1'>
																			Yes
																		</option>
																		<option value='0'>
																			No
																		</option>
																	</select>
																	{!error.errorsData ? (
																		<ErrorMessage
																			name='is_teaching_license'
																			component='div'
																			className='text-danger error_msg'
																		/>
																	) : (
																		<span className='text-danger error_msg'>
																			{error.errorsData &&
																			error
																				.errorsData
																				.is_teaching_license
																				? error
																						.errorsData
																						.is_teaching_license
																				: ''}
																		</span>
																	)}
																</div>
															</div>
															<div className='uf-single uf-single'>
																<div className='uf-label'>
																	Continuous
																	Professional
																	Development{' '}
																</div>
																<div className='uf-field'>
																	<select
																		className='search-yazmi'
																		name='continue_prof_dev'
																		onChange={
																			handleChange
																		}
																		value={
																			values.continue_prof_dev
																		}
																	>
																		<option value=''>
																			Select
																			Professional
																			Development
																		</option>
																		<option value='INTRODUCTION'>
																			Introduction
																		</option>
																		<option value='CPD'>
																			CPD
																		</option>
																	</select>
																	{!error.errorsData ? (
																		<ErrorMessage
																			name='continue_prof_dev'
																			component='div'
																			className='text-danger error_msg'
																		/>
																	) : (
																		<span className='text-danger error_msg'>
																			{error.errorsData &&
																			error
																				.errorsData
																				.continue_prof_dev
																				? error
																						.errorsData
																						.continue_prof_dev
																				: ''}
																		</span>
																	)}
																</div>
															</div>
															<div className='uf-single uf-single'>
																<div className='uf-label'>
																	English
																	Language
																	Development{' '}
																</div>
																<div className='uf-field'>
																	<select
																		className='search-yazmi'
																		name='is_eng_development'
																		onChange={
																			handleChange
																		}
																		value={
																			values.is_eng_development
																		}
																	>
																		<option value=''>
																			English
																			Language
																			Development
																		</option>
																		<option value='1'>
																			Yes
																		</option>
																		<option value='0'>
																			No
																		</option>
																	</select>
																	{!error.errorsData ? (
																		<ErrorMessage
																			name='is_eng_development'
																			component='div'
																			className='text-danger error_msg'
																		/>
																	) : (
																		<span className='text-danger error_msg'>
																			{error.errorsData &&
																			error
																				.errorsData
																				.is_eng_development
																				? error
																						.errorsData
																						.is_eng_development
																				: ''}
																		</span>
																	)}
																</div>
															</div>
															<div className='uf-single uf-single'>
																<div className='uf-label'>
																	Basic
																	Computer
																	Course{' '}
																</div>
																<div className='uf-field'>
																	<select
																		className='search-yazmi'
																		name='is_basic_comp_course'
																		onChange={
																			handleChange
																		}
																		value={
																			values.is_basic_comp_course
																		}
																	>
																		<option value=''>
																			Basic
																			Computer
																			Course
																		</option>
																		<option value='1'>
																			Yes
																		</option>
																		<option value='0'>
																			No
																		</option>
																	</select>
																	{!error.errorsData ? (
																		<ErrorMessage
																			name='is_basic_comp_course'
																			component='div'
																			className='text-danger error_msg'
																		/>
																	) : (
																		<span className='text-danger error_msg'>
																			{error.errorsData &&
																			error
																				.errorsData
																				.is_basic_comp_course
																				? error
																						.errorsData
																						.is_basic_comp_course
																				: ''}
																		</span>
																	)}
																</div>
															</div>
															<div className='uf-single uf-single'>
																<div className='uf-label'>
																	COC
																</div>
																<div className='uf-field'>
																	<select
																		className='search-yazmi'
																		name='is_coc'
																		onChange={
																			handleChange
																		}
																		value={
																			values.is_coc
																		}
																	>
																		<option value=''>
																			Select
																			COC
																		</option>
																		<option value='1'>
																			Yes
																		</option>
																		<option value='0'>
																			No
																		</option>
																	</select>
																	{!error.errorsData ? (
																		<ErrorMessage
																			name='is_coc'
																			component='div'
																			className='text-danger error_msg'
																		/>
																	) : (
																		<span className='text-danger error_msg'>
																			{error.errorsData &&
																			error
																				.errorsData
																				.is_coc
																				? error
																						.errorsData
																						.is_coc
																				: ''}
																		</span>
																	)}
																</div>
															</div>
															<div className='uf-single uf-single'>
																<div className='uf-label'>
																	Science,
																	Tech and
																	Math Course
																</div>
																<div className='uf-field'>
																	<select
																		className='search-yazmi'
																		name='is_sci_tech_math_course'
																		onChange={
																			handleChange
																		}
																		value={
																			values.is_sci_tech_math_course
																		}
																	>
																		<option value=''>
																			Science,
																			Tech
																			and
																			Math
																			Course
																		</option>
																		<option value='1'>
																			Yes
																		</option>
																		<option value='0'>
																			No
																		</option>
																	</select>
																	{!error.errorsData ? (
																		<ErrorMessage
																			name='is_sci_tech_math_course'
																			component='div'
																			className='text-danger error_msg'
																		/>
																	) : (
																		<span className='text-danger error_msg'>
																			{error.errorsData &&
																			error
																				.errorsData
																				.is_sci_tech_math_course
																				? error
																						.errorsData
																						.is_sci_tech_math_course
																				: ''}
																		</span>
																	)}
																</div>
															</div>
															<div className='uf-single uf-single'>
																<div className='uf-label'>
																	Disability
																	Status
																</div>
																<div className='uf-field'>
																	<select
																		className='search-yazmi'
																		name='disability'
																		onChange={
																			handleChange
																		}
																		value={
																			values.disability
																		}
																	>
																		<option value=''>
																			Select
																			Disability
																		</option>
																		<option value='NONDISABLE'>
																			Non-disabled{' '}
																		</option>
																		<option value='BLIND'>
																			Blind
																		</option>
																		<option value='DEAF'>
																			Deaf
																		</option>
																		<option value='OTHER'>
																			Other
																		</option>
																	</select>
																	{!error.errorsData ? (
																		<ErrorMessage
																			name='disability'
																			component='div'
																			className='text-danger error_msg'
																		/>
																	) : (
																		<span className='text-danger error_msg'>
																			{error.errorsData &&
																			error
																				.errorsData
																				.disability
																				? error
																						.errorsData
																						.disability
																				: ''}
																		</span>
																	)}
																</div>
															</div>
															{user !== '' ? (
																<div className='modal-form-cta'>
																	<button
																		className={
																			loading
																				? 'btn-primary-yazmi button_disable'
																				: 'btn-primary-yazmi'
																		}
																		disabled={
																			loading
																				? true
																				: false
																		}
																	>
																		Save
																	</button>
																	<button
																		type='button'
																		className='btn-secondary-yazmi'
																		onClick={
																			props.closeModal
																		}
																	>
																		Cancel
																	</button>
																</div>
															) : (
																<></>
															)}
														</Form>
													);
												}}
											</Formik>
										</>
									) : (
										<></>
									)}
								</div>
							</Tab>
						) : (
							<></>
						)}
					</Tabs>
				</Modal.Body>
			</Modal>
		</>
	);
};
export default AddUserModal;
