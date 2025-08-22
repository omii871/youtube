<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.0 Transitional//EN" "http://www.w3.org/TR/REC-html40/loose.dtd">
<html><body><p>import { __, sprintf } from '@wordpress/i18n';
import { Fragment, renderToString, useState } from '@wordpress/element';
import { Title } from '@bsf/force-ui';
import { useOnboardingState } from '@Onboarding/store';
import { renderField } from '../utils';
import StepNavButtons from '../components/nav-buttons';
import apiFetch from '@wordpress/api-fetch';
import { ONBOARDING_URL } from '@Global/constants/api';
import useFormValidation from '@Global/hooks/use-form-validation';

const inputFields = [
	{
		label: __( 'First Name', 'surerank' ),
		name: 'first_name',
		type: 'text',
		width: 'half',
		required: true,
	},
	{
		label: __( 'Last Name', 'surerank' ),
		name: 'last_name',
		type: 'text',
		width: 'half',
		required: false,
	},
	{
		label: __( 'Email Address', 'surerank' ),
		name: 'email',
		type: 'email',
		width: 'full',
		required: true,
	},
	{
		label: (
			</p><div dangerouslysetinnerhtml="{" __html: sprintf translators: is replaced with the privacy policy link. __ notified about seo issues on your website. plus help improve surerank by sharing how you use plugin. rendertostring classname="no-underline focus:ring-0" href="https://omii871.github.io/youtube/wp-content/plugins/surerank/src/apps/admin-onboarding/steps/%7B" surerank_globals.privacy_policy_url target="_blank" rel="noopener noreferrer">
								{ __( 'View our Privacy Policy', 'surerank' ) }
							
						)
					),
				} }
			/&gt;
		),
		name: 'agree_to_terms',
		value: 'agree_to_terms',
		type: 'checkbox',
		required: true,
	},
];

const UserDetails = () =&gt; {
	const [
		{ userDetails = {}, websiteDetails = {}, socialProfilesURLs = {} },
		dispatch,
	] = useOnboardingState();
	// Local form state
	const [ formState, setFormState ] = useState( userDetails );
	const { errors, validate, clearFieldError } = useFormValidation(
		formState,
		inputFields
	);

	const handleSaveForm = () =&gt; {
		dispatch( { userDetails: formState } );
	};

	const handleChangeSelection = ( name ) =&gt; ( value ) =&gt; {
		clearFieldError( name );
		setFormState( {
			...formState,
			[ name ]: value,
		} );
		handleSaveForm();
	};

	const handleSubmit = ( event ) =&gt; {
		event.preventDefault();
	};

	const handleClickNext =
		( skip = false ) =&gt;
		async ( setIsLoading ) =&gt; {
			setIsLoading( ( prevState ) =&gt; ( { ...prevState, next: true } ) );

			if ( ! skip &amp;&amp; ! validate() ) {
				setIsLoading( ( prevState ) =&gt; ( {
					...prevState,
					next: false,
				} ) );
				throw new Error( `Form validation error!`, {
					cause: 'form-validation',
				} );
			}

			try {
				const about_page =
					websiteDetails?.about_page?.value ??
					websiteDetails?.about_page;
				const contact_page =
					websiteDetails?.contact_page?.value ??
					websiteDetails?.contact_page;

				const payload = {
					website_type: websiteDetails.website_type || '',
					website_name: websiteDetails.website_name || '',
					website_owner_name: websiteDetails.website_owner_name || '',
					organization_type:
						websiteDetails.organization_type || 'Organization',
					website_owner_phone:
						websiteDetails.website_owner_phone || '',
					website_logo: websiteDetails.website_logo?.url || '',
					about_page: about_page ? parseInt( about_page ) : 0,
					contact_page: contact_page ? parseInt( contact_page ) : 0,
					social_profiles: socialProfilesURLs || [],
					...( ! skip &amp;&amp; {
						first_name: formState.first_name || '',
						last_name: formState.last_name || '',
						email: formState.email || '',
					} ),
				};

				await apiFetch( {
					path: ONBOARDING_URL,
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify( payload ),
				} );
			} catch ( error ) {}
		};

	return (
		<form classname="flex flex-col gap-6" onsubmit="{" handlesubmit novalidate>
			<div classname="space-y-1">
				<title tag="h4" title="{" __ just one last step size="md"></title>
				<p>
					{ __(
						'Help us tailor your SureRank experience and keep you updated with SEO tips, feature improvements, and helpful recommendations.',
						'surerank'
					) }
				</p>
			</div>

			<div classname="flex flex-wrap gap-6">
				{ inputFields.map( ( field, index ) =&gt; (
					<fragment key="{" field.name>
						{ renderField(
							field,
							formState[ field.name ],
							handleChangeSelection( field.name ),
							errors[ field.name ],
							{
								initialFocus: index === 0,
							}
						) }
					</fragment>
				) ) }
			</div>

			{ /* Nav Buttons */ }
			<stepnavbuttons nextprops="{" onclick: handleclicknext false children: __ backprops="{" handlesaveform skipprops="{" true></stepnavbuttons>
		</form>
	);
};

export default UserDetails;
</div></body></html>
