import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Modal } from 'react-bootstrap';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import { useDispatch, useSelector } from 'react-redux';
import { getRegionsData } from '../../../actions/Region';
import { getRegionSpecificWoredasData } from '../../../actions/Woreda';
import { updateSchoolData, getSchoolsData } from '../../../actions/School';
import { removeErrorData } from '../../../actions/RemoveError';
import * as yup from 'yup';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { toast } from 'react-toastify';

//validation
const validationSchema = yup.object({
	name: yup.string().required('Cannot be blank'),
	identification_number: yup.string().required('Cannot be blank'),
	region: yup.string().required('Please select one option'),
	woreda: yup.string().required('Please select one option'),
	establishment_year: yup.string().required('Cannot be blank'),
	email: yup
		.string()
		.email('Invalid entry for email address')
		.required('Cannot be blank'),
	phone_number: yup
		.string()
		.min(10, 'Phone number must be 10 characters')
		.max(10, 'Phone number must be 10 characters')
		.matches(/^\d+$/, 'Only numbers'),
	region_phone_number: yup
		.string()
		.min(10, 'Phone number must be 10 characters')
		.max(10, 'Phone number must be 10 characters')
		.matches(/^\d+$/, 'Only numbers'),
});

const validationSchemaForLocationTab = yup.object({
	where_it_is_located: yup.string().required('Please select one option'),
});

const validationSchemaForSchoolTab = yup.object({
	owned_by: yup.string().required('Please select one option'),
	is_school_owns_property: yup.string().required('Please select one option'),
	special_needs: yup.string().required('Please select one option'),
	is_yearly_budget: yup.string().required('Please select one option'),
	is_yearly_development_plan: yup
		.string()
		.required('Please select one option'),
	is_parent_unit: yup.string().required('Please select one option'),
	is_permanent_unit_leader: yup.string().required('Please select one option'),
});

const validationSchemaForFacilityTab = yup.object({
	building_number: yup.string().required('Cannot be blank'),
	no_of_libraries: yup.string().required('Cannot be blank'),
	no_of_offices: yup.string().required('Cannot be blank'),
	no_of_pedagogies: yup.string().required('Cannot be blank'),
	no_of_teacher_lounge: yup.string().required('Cannot be blank'),
	no_of_stores: yup.string().required('Cannot be blank'),
	no_of_auditorium: yup.string().required('Cannot be blank'),
	no_of_chemistry_labs: yup.string().required('Cannot be blank'),
	no_of_biology_labs: yup.string().required('Cannot be blank'),
});

const EditSchoolModal = (props) => {
	const [key, setKey] = useState('basic');
	const [disable1, setDisable1] = useState(true);
	const [disable2, setDisable2] = useState(true);
	const [disable3, setDisable3] = useState(true);
	const [btnClickFlag, setBtnClickFlag] = useState(false);
	const [loading, setLoading] = useState(false);

	const dispatch = useDispatch();
	const formRef = useRef();
	const form1Ref = useRef();
	const form2Ref = useRef();
	const form3Ref = useRef();

	useEffect(() => {
		if (window.location.href.includes('schools')) {
			dispatch(getRegionsData());
			// dispatch(getWoredasData());
		}
	}, []);

	const { regionData } = useSelector((state) => state.regionData);
	var { results } = regionData;

	const regionChange = (e) => {
		dispatch(getRegionSpecificWoredasData(e.target.value));
	};

	const woredaData = useSelector(
		(state) => state.woredaData.regionSpecificWoredaData.results
	);
	var woredaResults = woredaData;

	const { singleSchoolData } = useSelector((state) => state.schoolData);

	useEffect(() => {
		if (key !== 'basic') {
			setKey('basic');
		}
		if (singleSchoolData !== undefined && singleSchoolData.region) {
			dispatch(getRegionSpecificWoredasData(singleSchoolData.region));
		}
	}, [singleSchoolData]);

	const { error } = useSelector((state) => state);

	const saveBasicData = (e) => {
		setBtnClickFlag(false);
		dispatch(removeErrorData());
		if (
			!formRef.current.values.name == '' ||
			!formRef.current.values.identification_number == '' ||
			!formRef.current.values.region == '' ||
			!formRef.current.values.woreda == '' ||
			!formRef.current.values.establishment_year == '' ||
			!formRef.current.values.email == ''
		) {
			setDisable1(false);
			setKey('Location');
		}
	};

	const saveLocationData = (e) => {
		setBtnClickFlag(false);
		dispatch(removeErrorData());
		if (!form1Ref.current.values.where_it_is_located == '') {
			setDisable2(false);
			setKey('School');
		}
	};

	const saveSchoolData = (e) => {
		setBtnClickFlag(false);
		dispatch(removeErrorData());
		if (
			!form2Ref.current.values.owned_by == '' ||
			!form2Ref.current.values.is_school_owns_property == '' ||
			!form2Ref.current.values.special_needs == '' ||
			!form2Ref.current.values.is_yearly_budget == '' ||
			!form2Ref.current.values.is_yearly_development_plan == '' ||
			!form2Ref.current.values.is_parent_unit == '' ||
			!form2Ref.current.values.is_permanent_unit_leader == ''
		) {
			setDisable3(false);
			setKey('Facilities');
		}
	};

	const saveAllData = (e) => {
		let geolocation = '';
		setBtnClickFlag(true);
		setLoading(true);
		if (
			formRef.current.values.latitude &&
			formRef.current.values.longitude
		) {
			geolocation =
				formRef.current.values.latitude +
				',' +
				formRef.current.values.longitude;
		} else {
			if (formRef.current.values.latitude) {
				geolocation = formRef.current.values.latitude;
			} else if (formRef.current.values.longitude) {
				geolocation = formRef.current.values.longitude;
			}
		}
		formRef.current.values.geolocation = geolocation;

		let idData = {
			id: singleSchoolData.id,
		};

		let save_data = {
			...idData,
			...formRef.current.values,
			...form1Ref.current.values,
			...form2Ref.current.values,
			...form3Ref.current.values,
		};

		dispatch(updateSchoolData(save_data));
	};

	const schoolResData = useSelector(
		(state) => state.schoolData.updateSchoolData
	);

	useEffect(() => {
		//if success then only execute
		if (
			schoolResData.id &&
			props.show &&
			btnClickFlag &&
			error.errorsData === ''
		) {
			props.closeModal();
			setBtnClickFlag(false);
			setLoading(false);
			setDisable1(true);
			setDisable2(true);
			setDisable3(true);
			setKey('basic');
			toast.success('School Updated');
			dispatch(getSchoolsData());
		} else {
			if (error && error.errorsData && btnClickFlag) {
				setLoading(false);
				if (
					error.errorsData.name ||
					error.errorsData.identification_number ||
					error.errorsData.prenamevious_name ||
					error.errorsData.previous_level ||
					error.errorsData.establishment_year ||
					error.errorsData.geolocation ||
					error.errorsData.region ||
					error.errorsData.zone ||
					error.errorsData.woreda ||
					error.errorsData.email ||
					error.errorsData.post_number ||
					error.errorsData.phone_number ||
					error.errorsData.region_phone_number
				) {
					setBtnClickFlag(false);
					setDisable1(true);
					setDisable2(true);
					setDisable3(true);
					setKey('basic');
				}
			} else if (
				error.errorsData.distance_from_regional_capital ||
				error.errorsData.distance_from_addis_abba ||
				error.errorsData.distance_from_central_region ||
				error.errorsData.distance_from_central_zone ||
				error.errorsData.where_it_is_located
			) {
				setBtnClickFlag(false);
				setDisable2(true);
				setDisable3(true);
				setKey('Location');
			} else if (
				error.errorsData.owned_by ||
				error.errorsData.is_school_owns_property ||
				error.errorsData.property_area ||
				error.errorsData.special_needs ||
				error.errorsData.is_yearly_budget ||
				error.errorsData.is_yearly_development_plan ||
				error.errorsData.is_parent_unit ||
				error.errorsData.is_permanent_unit_leader ||
				error.errorsData.standard_inspection_level
			) {
				setBtnClickFlag(false);
				setDisable3(true);
				setKey('School');
			} else if (
				error.errorsData.building_number ||
				error.errorsData.no_of_libraries ||
				error.errorsData.no_of_offices ||
				error.errorsData.no_of_pedagogies ||
				error.errorsData.no_of_teacher_lounge ||
				error.errorsData.no_of_stores ||
				error.errorsData.no_of_auditorium ||
				error.errorsData.no_of_chemistry_labs ||
				error.errorsData.no_of_biology_labs ||
				error.errorsData.others
			) {
				setBtnClickFlag(false);
				setKey('Facilities');
			}
		}
	}, [schoolResData, error]);

	return (
		<>
			<Modal
				show={props.show}
				onHide={() => {
					props.closeModal();
					dispatch(removeErrorData());
				}}
				className='edit-modal'
			>
				<Modal.Header closeButton>
					<Modal.Title>
						<h3>Edit School Details</h3>
						<Link
							className='close-modal-header'
							onClick={() => {
								props.closeModal();
								dispatch(removeErrorData());
							}}
						>
							<img
								src={
									process.env.PUBLIC_URL +
									'/images/modal-close.svg'
								}
								alt='Close'
							/>
						</Link>
					</Modal.Title>
				</Modal.Header>
				<Modal.Body className='school_tab'>
					<Tabs
						onSelect={(k) => setKey(k)}
						activeKey={key}
						id='uncontrolled-tab-example'
						className='mb-0 nav_tab_width'
					>
						<Tab eventKey='basic' title='Basic Data'>
							<Formik
								initialValues={{
									name: singleSchoolData.name,
									identification_number:
										singleSchoolData.identification_number,
									previous_name:
										singleSchoolData.previous_name,
									previous_level:
										singleSchoolData.previous_level,
									establishment_year:
										singleSchoolData.establishment_year,
									latitude:
										singleSchoolData.geolocation &&
										singleSchoolData.geolocation.split(
											','
										)[0],
									longitude:
										singleSchoolData.geolocation &&
										singleSchoolData.geolocation.split(
											','
										)[1],
									region: singleSchoolData.region,
									zone: singleSchoolData.zone,
									woreda: singleSchoolData.woreda,
									email: singleSchoolData.email,
									post_number: singleSchoolData.post_number,
									phone_number: singleSchoolData.phone_number,
									region_phone_number:
										singleSchoolData.region_phone_number,
								}}
								validationSchema={validationSchema}
								onSubmit={saveBasicData}
								innerRef={formRef}
							>
								{({ values, handleChange, setFieldValue }) => {
									return (
										<Form className='modal-form-wrapper'>
											<div className='modal-form-wrapper'>
												<div className='uf-single'>
													<div className='uf-label'>
														Name
													</div>
													<div className='uf-field'>
														<Field
															type='text'
															name='name'
															className='input-yazmi'
															placeholder='Enter name'
															maxlength='50'
														/>
														{!error.errorsData ? (
															<ErrorMessage
																name='name'
																component='div'
																className='text-danger error_msg'
															/>
														) : (
															<span className='text-danger error_msg'>
																{error.errorsData &&
																error.errorsData
																	.name
																	? error
																			.errorsData
																			.name
																	: ''}
															</span>
														)}
													</div>
												</div>
												<div className='uf-single'>
													<div className='uf-label'>
														ID Number
													</div>
													<div className='uf-field'>
														<Field
															type='text'
															name='identification_number'
															className='input-yazmi'
															placeholder='Enter ID'
														/>
														{!error.errorsData ? (
															<ErrorMessage
																name='identification_number'
																component='div'
																className='text-danger error_msg'
															/>
														) : (
															<span className='text-danger error_msg'>
																{error.errorsData &&
																error.errorsData
																	.identification_number
																	? error
																			.errorsData
																			.identification_number
																	: ''}
															</span>
														)}
													</div>
												</div>
												<div className='uf-single'>
													<div className='uf-label'>
														Prev School Name
													</div>
													<div className='uf-field'>
														<Field
															type='text'
															name='previous_name'
															className='input-yazmi'
															placeholder='Enter prev school name'
															maxlength='50'
														/>
														{!error.errorsData ? (
															<></>
														) : (
															<span className='text-danger error_msg'>
																{error.errorsData &&
																error.errorsData
																	.previous_name
																	? error
																			.errorsData
																			.previous_name
																	: ''}
															</span>
														)}
													</div>
												</div>
												<div className='uf-single'>
													<div className='uf-label'>
														Prev School Level
													</div>
													<div className='uf-field'>
														<Field
															type='number'
															name='previous_level'
															className='input-yazmi appearance_none'
															placeholder='Enter prev school level'
														/>
														{!error.errorsData ? (
															<></>
														) : (
															<span className='text-danger error_msg'>
																{error.errorsData &&
																error.errorsData
																	.previous_level
																	? error
																			.errorsData
																			.previous_level
																	: ''}
															</span>
														)}
													</div>
												</div>
												<div className='uf-single'>
													<div className='uf-label'>
														School
														<br />
														Establishment Year
													</div>
													<div className='uf-field'>
														<Field
															type='number'
															name='establishment_year'
															className='input-yazmi appearance_none'
															placeholder='Enter establishment year'
														/>
														{!error.errorsData ? (
															<ErrorMessage
																name='establishment_year'
																component='div'
																className='text-danger error_msg'
															/>
														) : (
															<span className='text-danger error_msg'>
																{error.errorsData &&
																error.errorsData
																	.establishment_year
																	? error
																			.errorsData
																			.establishment_year
																	: ''}
															</span>
														)}
													</div>
												</div>
												<div className='uf-single uf-single'>
													<div className='uf-label'>
														Geo Location
													</div>
													<div className='uf-field uf-field-two'>
														<Field
															type='number'
															name='latitude'
															className='input-yazmi appearance_none'
															placeholder='Latitude'
														/>
														<Field
															type='number'
															name='longitude'
															className='input-yazmi appearance_none'
															placeholder='Longitude'
														/>
														{!error.errorsData ? (
															<></>
														) : (
															<span className='text-danger error_msg'>
																{error.errorsData &&
																error.errorsData
																	.geolocation
																	? error
																			.errorsData
																			.geolocation
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
															className='search-yazmi select_yazmi'
															// onChange={
															// 	handleChange
															// }
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
															{results &&
																results.map(
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
														Zone
													</div>
													<div className='uf-field'>
														<Field
															type='text'
															name='zone'
															className='input-yazmi'
															placeholder='Enter zone'
															maxlength='50'
														/>
														{!error.errorsData ? (
															<></>
														) : (
															<span className='text-danger error_msg'>
																{error.errorsData &&
																error.errorsData
																	.zone
																	? error
																			.errorsData
																			.zone
																	: ''}
															</span>
														)}
													</div>
												</div>
												<div className='uf-single'>
													<div className='uf-label'>
														Wordea
													</div>
													<div className='uf-field'>
														<select
															className='search-yazmi select_yazmi'
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
														Email
													</div>
													<div className='uf-field'>
														<Field
															type='email'
															name='email'
															className='input-yazmi'
															placeholder='Enter email'
														/>
														{!error.errorsData ? (
															<ErrorMessage
																name='email'
																component='div'
																className='text-danger error_msg'
															/>
														) : (
															<span className='text-danger error_msg'>
																{error.errorsData &&
																error.errorsData
																	.email
																	? error
																			.errorsData
																			.email
																	: ''}
															</span>
														)}
													</div>
												</div>
												<div className='uf-single'>
													<div className='uf-label'>
														Post Number
													</div>
													<div className='uf-field'>
														<Field
															type='number'
															name='post_number'
															className='input-yazmi appearance_none'
															placeholder='Enter post number'
														/>
														{!error.errorsData ? (
															<></>
														) : (
															<span className='text-danger error_msg'>
																{error.errorsData &&
																error.errorsData
																	.post_number
																	? error
																			.errorsData
																			.post_number
																	: ''}
															</span>
														)}
													</div>
												</div>
												<div className='uf-single'>
													<div className='uf-label'>
														School
														<br />
														Phone Number
													</div>
													<div className='uf-field'>
														<Field
															type='text'
															name='phone_number'
															className='input-yazmi appearance_none'
															placeholder='Enter school phone number'
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
																error.errorsData
																	.phone_number
																	? error
																			.errorsData
																			.phone_number
																	: ''}
															</span>
														)}
													</div>
												</div>
												<div className='uf-single'>
													<div className='uf-label'>
														Region
														<br />
														Phone Number
													</div>
													<div className='uf-field'>
														<Field
															type='text'
															name='region_phone_number'
															className='input-yazmi appearance_none'
															placeholder='Enter region phone number'
														/>
														{!error.errorsData ? (
															<ErrorMessage
																name='region_phone_number'
																component='div'
																className='text-danger error_msg'
															/>
														) : (
															<span className='text-danger error_msg'>
																{error.errorsData &&
																error.errorsData
																	.region_phone_number
																	? error
																			.errorsData
																			.region_phone_number
																	: ''}
															</span>
														)}
													</div>
												</div>
												<div className='modal-form-cta'>
													<button className='btn-primary-yazmi'>
														Save
													</button>
													<button
														type='button'
														className='btn-secondary-yazmi'
														onClick={() => {
															props.closeModal();
															dispatch(
																removeErrorData()
															);
														}}
													>
														Cancel
													</button>
												</div>
											</div>
										</Form>
									);
								}}
							</Formik>
						</Tab>
						<Tab
							eventKey='Location'
							title='Location Details'
							disabled={disable1}
						>
							<Formik
								initialValues={{
									distance_from_regional_capital:
										singleSchoolData.distance_from_regional_capital,
									distance_from_addis_abba:
										singleSchoolData.distance_from_addis_abba,
									distance_from_central_region:
										singleSchoolData.distance_from_central_region,
									distance_from_central_zone:
										singleSchoolData.distance_from_central_zone,
									where_it_is_located:
										singleSchoolData.where_it_is_located,
								}}
								validationSchema={
									validationSchemaForLocationTab
								}
								onSubmit={saveLocationData}
								innerRef={form1Ref}
							>
								{({ values, handleChange }) => {
									return (
										<Form className='modal-form-wrapper'>
											<div className='modal-form-wrapper'>
												<div className='uf-single'>
													<div className='uf-label'>
														School Distance From The
														Regional Capital
													</div>
													<div className='uf-field'>
														<Field
															type='number'
															className='input-yazmi appearance_none'
															placeholder='Distance from region capital'
															name='distance_from_regional_capital'
														/>
														{!error.errorsData ? (
															<></>
														) : (
															<span className='text-danger error_msg'>
																{error.errorsData &&
																error.errorsData
																	.distance_from_regional_capital
																	? error
																			.errorsData
																			.distance_from_regional_capital
																	: ''}
															</span>
														)}
													</div>
												</div>
												<div className='uf-single'>
													<div className='uf-label'>
														School Distance From
														Addis Ababa
													</div>
													<div className='uf-field'>
														<Field
															type='number'
															className='input-yazmi appearance_none'
															placeholder='Distance from addis ababa'
															name='distance_from_addis_abba'
														/>
														{!error.errorsData ? (
															<></>
														) : (
															<span className='text-danger error_msg'>
																{error.errorsData &&
																error.errorsData
																	.distance_from_addis_abba
																	? error
																			.errorsData
																			.distance_from_addis_abba
																	: ''}
															</span>
														)}
													</div>
												</div>
												<div className='uf-single'>
													<div className='uf-label'>
														School Distance From
														Central Woreda
													</div>
													<div className='uf-field'>
														<Field
															type='number'
															className='input-yazmi appearance_none'
															placeholder='Distance from central woreda'
															name='distance_from_central_region'
														/>
														{!error.errorsData ? (
															<></>
														) : (
															<span className='text-danger error_msg'>
																{error.errorsData &&
																error.errorsData
																	.distance_from_central_region
																	? error
																			.errorsData
																			.distance_from_central_region
																	: ''}
															</span>
														)}
													</div>
												</div>
												<div className='uf-single'>
													<div className='uf-label'>
														School Distance From
														Central Zone
													</div>
													<div className='uf-field'>
														<Field
															type='number'
															className='input-yazmi appearance_none'
															placeholder='Distance from central zone'
															name='distance_from_central_zone'
														/>
														{!error.errorsData ? (
															<></>
														) : (
															<span className='text-danger error_msg'>
																{error.errorsData &&
																error.errorsData
																	.distance_from_central_zone
																	? error
																			.errorsData
																			.distance_from_central_zone
																	: ''}
															</span>
														)}
													</div>
												</div>
												<div className='uf-single'>
													<div className='uf-label'>
														Where is it located?
													</div>
													<div className='uf-field'>
														<select
															className='search-yazmi'
															name='where_it_is_located'
															onChange={
																handleChange
															}
															value={
																values.where_it_is_located
															}
														>
															<option value=''>
																Select Location
															</option>
															<option value='CITY'>
																City
															</option>
															<option value='RURAL'>
																Rural
															</option>
														</select>
														{!error.errorsData ? (
															<ErrorMessage
																name='where_it_is_located'
																component='div'
																className='text-danger error_msg'
															/>
														) : (
															<span className='text-danger error_msg'>
																{error.errorsData &&
																error.errorsData
																	.where_it_is_located
																	? error
																			.errorsData
																			.where_it_is_located
																	: ''}
															</span>
														)}
													</div>
												</div>
												<div className='modal-form-cta'>
													<button className='btn-primary-yazmi'>
														Save
													</button>
													<button
														type='button'
														className='btn-secondary-yazmi'
														onClick={() => {
															props.closeModal();
															dispatch(
																removeErrorData()
															);
														}}
													>
														Cancel
													</button>
												</div>
											</div>
										</Form>
									);
								}}
							</Formik>
						</Tab>
						<Tab
							eventKey='School'
							title='School Category'
							disabled={disable2}
						>
							<Formik
								initialValues={{
									owned_by: singleSchoolData.owned_by,
									is_school_owns_property:
										singleSchoolData.is_school_owns_property,
									property_area:
										singleSchoolData.property_area,
									special_needs:
										singleSchoolData.special_needs,
									is_yearly_budget:
										singleSchoolData.is_yearly_budget,
									is_yearly_development_plan:
										singleSchoolData.is_yearly_development_plan,
									is_parent_unit:
										singleSchoolData.is_parent_unit,
									is_permanent_unit_leader:
										singleSchoolData.is_permanent_unit_leader,
									standard_inspection_level:
										singleSchoolData.standard_inspection_level,
								}}
								validationSchema={validationSchemaForSchoolTab}
								onSubmit={saveSchoolData}
								standard_inspection_level
								innerRef={form2Ref}
							>
								{({ values, handleChange }) => {
									return (
										<Form className='modal-form-wrapper'>
											<div className='modal-form-wrapper broadcast-form-wrapper'>
												<div className='uf-single'>
													<div className='uf-label'>
														Ownership
													</div>
													<div className='uf-field'>
														<select
															className='search-yazmi'
															name='owned_by'
															onChange={
																handleChange
															}
															value={
																values.owned_by
															}
														>
															<option value=''>
																Select Owned By
															</option>
															<option value='GOVERNMENT'>
																Governmental
															</option>
															<option value='MISSIONARY'>
																Missionary
															</option>
															<option value='COMMUNITY'>
																Community
															</option>
															<option value='CHURCH'>
																Church/Mosque
															</option>
															<option value='PUBLIC'>
																Public
															</option>
															<option value='PRIVATE'>
																Private
															</option>
															<option value='OTHER'>
																Other
															</option>
														</select>
														{!error.errorsData ? (
															<ErrorMessage
																name='owned_by'
																component='div'
																className='text-danger error_msg'
															/>
														) : (
															<span className='text-danger error_msg'>
																{error.errorsData &&
																error.errorsData
																	.owned_by
																	? error
																			.errorsData
																			.owned_by
																	: ''}
															</span>
														)}
													</div>
												</div>
												<div className='uf-single'>
													<div className='uf-label'>
														Has School property
														Ownership
													</div>
													<div className='uf-field'>
														<select
															className='search-yazmi'
															name='is_school_owns_property'
															onChange={
																handleChange
															}
															value={
																values.is_school_owns_property
															}
														>
															<option value=''>
																Property Right
															</option>
															<option value='true'>
																Yes
															</option>
															<option value='false'>
																No
															</option>
														</select>
														{!error.errorsData ? (
															<ErrorMessage
																name='is_school_owns_property'
																component='div'
																className='text-danger error_msg'
															/>
														) : (
															<span className='text-danger error_msg'>
																{error.errorsData &&
																error.errorsData
																	.is_school_owns_property
																	? error
																			.errorsData
																			.is_school_owns_property
																	: ''}
															</span>
														)}
													</div>
												</div>
												<div className='uf-single'>
													<div className='uf-label'>
														If they have the
														property right
													</div>
													<div className='uf-field'>
														<Field
															type='number'
															name='property_area'
															className='input-yazmi appearance_none'
															placeholder='Area in meter square'
														/>
														{!error.errorsData ? (
															<></>
														) : (
															<span className='text-danger error_msg'>
																{error.errorsData &&
																error.errorsData
																	.property_area
																	? error
																			.errorsData
																			.property_area
																	: ''}
															</span>
														)}
													</div>
												</div>
												<div className='uf-single'>
													<div className='uf-label'>
														Does the School Provide
														Special Needs
													</div>
													<div className='uf-field'>
														<select
															className='search-yazmi'
															name='special_needs'
															onChange={
																handleChange
															}
															value={
																values.special_needs
															}
														>
															<option value=''>
																Special Needs
																Availablity
															</option>
															<option value='true'>
																Yes
															</option>
															<option value='false'>
																No
															</option>
														</select>
														{!error.errorsData ? (
															<ErrorMessage
																name='special_needs'
																component='div'
																className='text-danger error_msg'
															/>
														) : (
															<span className='text-danger error_msg'>
																{error.errorsData &&
																error.errorsData
																	.special_needs
																	? error
																			.errorsData
																			.special_needs
																	: ''}
															</span>
														)}
													</div>
												</div>
												<div className='uf-single'>
													<div className='uf-label'>
														Does the School received
														yearly school budgets
													</div>
													<div className='uf-field'>
														<select
															className='search-yazmi'
															name='is_yearly_budget'
															onChange={
																handleChange
															}
															value={
																values.is_yearly_budget
															}
														>
															<option value=''>
																Budget Source
															</option>
															<option value='true'>
																Yes
															</option>
															<option value='false'>
																No
															</option>
														</select>
														{!error.errorsData ? (
															<ErrorMessage
																name='is_yearly_budget'
																component='div'
																className='text-danger error_msg'
															/>
														) : (
															<span className='text-danger error_msg'>
																{error.errorsData &&
																error.errorsData
																	.is_yearly_budget
																	? error
																			.errorsData
																			.is_yearly_budget
																	: ''}
															</span>
														)}
													</div>
												</div>

												<div className='uf-single'>
													<div className='uf-label'>
														Does the School have 3
														years school Development
														Plan
													</div>
													<div className='uf-field'>
														<select
															className='search-yazmi'
															name='is_yearly_development_plan'
															onChange={
																handleChange
															}
															value={
																values.is_yearly_development_plan
															}
														>
															<option value=''>
																Improvement Plan
															</option>
															<option value='true'>
																Yes
															</option>
															<option value='false'>
																No
															</option>
														</select>
														{!error.errorsData ? (
															<ErrorMessage
																name='is_yearly_development_plan'
																component='div'
																className='text-danger error_msg'
															/>
														) : (
															<span className='text-danger error_msg'>
																{error.errorsData &&
																error.errorsData
																	.is_yearly_development_plan
																	? error
																			.errorsData
																			.is_yearly_development_plan
																	: ''}
															</span>
														)}
													</div>
												</div>

												<div className='uf-single'>
													<div className='uf-label'>
														Does the school form
														Parent Unity
													</div>
													<div className='uf-field'>
														<select
															className='search-yazmi'
															name='is_parent_unit'
															onChange={
																handleChange
															}
															value={
																values.is_parent_unit
															}
														>
															<option value=''>
																Select Parent
																Unit
															</option>
															<option value='true'>
																Yes
															</option>
															<option value='false'>
																No
															</option>
														</select>
														{!error.errorsData ? (
															<ErrorMessage
																name='is_parent_unit'
																component='div'
																className='text-danger error_msg'
															/>
														) : (
															<span className='text-danger error_msg'>
																{error.errorsData &&
																error.errorsData
																	.is_parent_unit
																	? error
																			.errorsData
																			.is_parent_unit
																	: ''}
															</span>
														)}
													</div>
												</div>

												<div className='uf-single'>
													<div className='uf-label'>
														Does the school has
														Permanent Unit Leader{' '}
													</div>
													<div className='uf-field'>
														<select
															className='search-yazmi'
															name='is_permanent_unit_leader'
															onChange={
																handleChange
															}
															value={
																values.is_permanent_unit_leader
															}
														>
															<option value=''>
																Select Permanent
																Unit Leader
															</option>
															<option value='true'>
																Yes
															</option>
															<option value='false'>
																No
															</option>
														</select>
														{!error.errorsData ? (
															<ErrorMessage
																name='is_permanent_unit_leader'
																component='div'
																className='text-danger error_msg'
															/>
														) : (
															<span className='text-danger error_msg'>
																{error.errorsData &&
																error.errorsData
																	.is_permanent_unit_leader
																	? error
																			.errorsData
																			.is_permanent_unit_leader
																	: ''}
															</span>
														)}
													</div>
												</div>

												<div className='uf-single'>
													<div className='uf-label'>
														School Standard
														Inspection Report
													</div>
													<div className='uf-field'>
														<select
															className='search-yazmi'
															name='standard_inspection_level'
															onChange={
																handleChange
															}
															value={
																values.standard_inspection_level
															}
														>
															<option value=''>
																Standard
																Inspection Level
															</option>
															<option value='L1'>
																Level-1
															</option>
															<option value='L2'>
																Level-2
															</option>
															<option value='L3'>
																Level-3
															</option>
															<option value='L4'>
																Level-4
															</option>
															<option value='NA'>
																Not-given
															</option>
														</select>
														{!error.errorsData ? (
															<></>
														) : (
															<span className='text-danger error_msg'>
																{error.errorsData &&
																error.errorsData
																	.standard_inspection_level
																	? error
																			.errorsData
																			.standard_inspection_level
																	: ''}
															</span>
														)}
													</div>
												</div>
												<div className='modal-form-cta'>
													<button className='btn-primary-yazmi'>
														Save
													</button>
													<button
														type='button'
														className='btn-secondary-yazmi'
														onClick={() => {
															props.closeModal();
															dispatch(
																removeErrorData()
															);
														}}
													>
														Cancel
													</button>
												</div>
											</div>
										</Form>
									);
								}}
							</Formik>
						</Tab>
						<Tab
							eventKey='Facilities'
							title='Building/Facilities'
							disabled={disable3}
						>
							<Formik
								initialValues={{
									building_number:
										singleSchoolData.building_number,
									no_of_libraries:
										singleSchoolData.no_of_libraries,
									no_of_offices:
										singleSchoolData.no_of_offices,
									no_of_pedagogies:
										singleSchoolData.no_of_pedagogies,
									no_of_teacher_lounge:
										singleSchoolData.no_of_teacher_lounge,
									no_of_stores: singleSchoolData.no_of_stores,
									no_of_auditorium:
										singleSchoolData.no_of_auditorium,
									no_of_chemistry_labs:
										singleSchoolData.no_of_chemistry_labs,
									no_of_biology_labs:
										singleSchoolData.no_of_biology_labs,
									others: singleSchoolData.others,
								}}
								validationSchema={
									validationSchemaForFacilityTab
								}
								onSubmit={saveAllData}
								innerRef={form3Ref}
							>
								{({ values, handleChange }) => {
									return (
										<Form className='modal-form-wrapper'>
											<div className='modal-form-wrapper broadcast-form-wrapper'>
												<div className='uf-single'>
													<div className='uf-label'>
														Building Number{' '}
													</div>
													<div className='uf-field'>
														<Field
															type='number'
															name='building_number'
															className='input-yazmi appearance_none'
															placeholder="School's Building number"
														/>
														{!error.errorsData ? (
															<ErrorMessage
																name='building_number'
																component='div'
																className='text-danger error_msg'
															/>
														) : (
															<span className='text-danger error_msg'>
																{error.errorsData &&
																error.errorsData
																	.building_number
																	? error
																			.errorsData
																			.building_number
																	: ''}
															</span>
														)}
													</div>
												</div>
												<div className='uf-single'>
													<div className='uf-label'>
														Number of Libraries
													</div>
													<div className='uf-field'>
														<Field
															type='number'
															name='no_of_libraries'
															className='input-yazmi appearance_none'
															placeholder='No of libraries'
														/>
														{!error.errorsData ? (
															<ErrorMessage
																name='no_of_libraries'
																component='div'
																className='text-danger error_msg'
															/>
														) : (
															<span className='text-danger error_msg'>
																{error.errorsData &&
																error.errorsData
																	.no_of_libraries
																	? error
																			.errorsData
																			.no_of_libraries
																	: ''}
															</span>
														)}
													</div>
												</div>
												<div className='uf-single'>
													<div className='uf-label'>
														Number of Offices{' '}
													</div>
													<div className='uf-field'>
														<Field
															type='number'
															name='no_of_offices'
															className='input-yazmi appearance_none'
															placeholder='No of offices'
														/>
														{!error.errorsData ? (
															<ErrorMessage
																name='no_of_offices'
																component='div'
																className='text-danger error_msg'
															/>
														) : (
															<span className='text-danger error_msg'>
																{error.errorsData &&
																error.errorsData
																	.no_of_offices
																	? error
																			.errorsData
																			.no_of_offices
																	: ''}
															</span>
														)}
													</div>
												</div>
												<div className='uf-single'>
													<div className='uf-label'>
														Number of Pedagogies
													</div>
													<div className='uf-field'>
														<Field
															type='number'
															name='no_of_pedagogies'
															className='input-yazmi appearance_none'
															placeholder='No of pedagogies'
														/>
														{!error.errorsData ? (
															<ErrorMessage
																name='no_of_pedagogies'
																component='div'
																className='text-danger error_msg'
															/>
														) : (
															<span className='text-danger error_msg'>
																{error.errorsData &&
																error.errorsData
																	.no_of_pedagogies
																	? error
																			.errorsData
																			.no_of_pedagogies
																	: ''}
															</span>
														)}
													</div>
												</div>
												<div className='uf-single'>
													<div className='uf-label'>
														Number of Teacher Lounge
													</div>
													<div className='uf-field'>
														<Field
															type='number'
															name='no_of_teacher_lounge'
															className='input-yazmi appearance_none'
															placeholder='No of lounges'
														/>
														{!error.errorsData ? (
															<ErrorMessage
																name='no_of_teacher_lounge'
																component='div'
																className='text-danger error_msg'
															/>
														) : (
															<span className='text-danger error_msg'>
																{error.errorsData &&
																error.errorsData
																	.no_of_teacher_lounge
																	? error
																			.errorsData
																			.no_of_teacher_lounge
																	: ''}
															</span>
														)}
													</div>
												</div>
												<div className='uf-single'>
													<div className='uf-label'>
														Number of Stores
													</div>
													<div className='uf-field'>
														<Field
															type='number'
															name='no_of_stores'
															className='input-yazmi appearance_none'
															placeholder='No of stores'
														/>
														{!error.errorsData ? (
															<ErrorMessage
																name='no_of_stores'
																component='div'
																className='text-danger error_msg'
															/>
														) : (
															<span className='text-danger error_msg'>
																{error.errorsData &&
																error.errorsData
																	.no_of_stores
																	? error
																			.errorsData
																			.no_of_stores
																	: ''}
															</span>
														)}
													</div>
												</div>
												<div className='uf-single'>
													<div className='uf-label'>
														Number of Auditorium
													</div>
													<div className='uf-field'>
														<Field
															type='number'
															name='no_of_auditorium'
															className='input-yazmi appearance_none'
															placeholder='No of auditoriums'
														/>
														{!error.errorsData ? (
															<ErrorMessage
																name='no_of_auditorium'
																component='div'
																className='text-danger error_msg'
															/>
														) : (
															<span className='text-danger error_msg'>
																{error.errorsData &&
																error.errorsData
																	.no_of_auditorium
																	? error
																			.errorsData
																			.no_of_auditorium
																	: ''}
															</span>
														)}
													</div>
												</div>
												<div className='uf-single'>
													<div className='uf-label'>
														Number of Chemistry Labs
													</div>
													<div className='uf-field'>
														<Field
															type='number'
															name='no_of_chemistry_labs'
															className='input-yazmi appearance_none'
															placeholder='No of labs'
														/>
														{!error.errorsData ? (
															<ErrorMessage
																name='no_of_chemistry_labs'
																component='div'
																className='text-danger error_msg'
															/>
														) : (
															<span className='text-danger error_msg'>
																{error.errorsData &&
																error.errorsData
																	.no_of_chemistry_labs
																	? error
																			.errorsData
																			.no_of_chemistry_labs
																	: ''}
															</span>
														)}
													</div>
												</div>
												<div className='uf-single'>
													<div className='uf-label'>
														Number of Biology Labs
													</div>
													<div className='uf-field'>
														<Field
															type='number'
															name='no_of_biology_labs'
															className='input-yazmi appearance_none'
															placeholder='No of labs'
														/>
														{!error.errorsData ? (
															<ErrorMessage
																name='no_of_biology_labs'
																component='div'
																className='text-danger error_msg'
															/>
														) : (
															<span className='text-danger error_msg'>
																{error.errorsData &&
																error.errorsData
																	.no_of_biology_labs
																	? error
																			.errorsData
																			.no_of_biology_labs
																	: ''}
															</span>
														)}
													</div>
												</div>
												<div className='uf-single'>
													<div className='uf-label'>
														WASH Facilities/ School
														Area/other details/Staff
														details incl.
														non-teaching staff
													</div>
													<div className='uf-field'>
														<textarea
															rows='4'
															cols='50'
															className='input-yazmi appearance_none'
															placeholder='Mix Details'
															name='others'
															maxlength='250'
															onChange={
																handleChange
															}
															value={
																values.others
															}
														/>
														{!error.errorsData ? (
															<></>
														) : (
															<span className='text-danger error_msg'>
																{error.errorsData &&
																error.errorsData
																	.others
																	? error
																			.errorsData
																			.others
																	: ''}
															</span>
														)}
													</div>
												</div>
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
														onClick={() => {
															props.closeModal();
															dispatch(
																removeErrorData()
															);
														}}
													>
														Cancel
													</button>
												</div>
											</div>
										</Form>
									);
								}}
							</Formik>
						</Tab>
					</Tabs>
				</Modal.Body>
			</Modal>
		</>
	);
};
export default EditSchoolModal;
