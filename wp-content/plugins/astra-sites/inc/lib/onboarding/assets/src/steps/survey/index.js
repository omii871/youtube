<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.0 Transitional//EN" "http://www.w3.org/TR/REC-html40/loose.dtd">
<html><body><p>import React, { useState } from 'react';
import Tooltip from '../../components/tooltip/tooltip';
import { __, sprintf } from '@wordpress/i18n';
import { PreviousStepLink, DefaultStep } from '../../components/index';
import ICONS from '../../../icons';
import { useStateValue } from '../../store/store';
import { checkRequiredPlugins } from '../../steps/import-site/import-utils';
import SurveyForm from './survey';
import AdvancedSettings from './advanced-settings';
import './style.scss';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';

const { phpVersion, analytics, firstImportStatus } = starterTemplates;

const Survey = () =&gt; {
	const storedState = useStateValue();
	const [
		{
			currentIndex,
			builder,
			requiredPlugins,
			notInstalledList,
			notActivatedList,
			analyticsFlag,
			shownRequirementOnce,
			pluginInstallationAttempts,
			fileSystemPermissions,
			formDetails,
			allowResetSite,
		},
		dispatch,
	] = storedState;

	const notInstalled = requiredPlugins?.required_plugins?.notinstalled;
	const notActivated = requiredPlugins?.required_plugins?.inactive;
	const allPuginList = [];
	if ( notInstalled?.length &gt; 0 ) {
		notInstalled.map( ( plugin ) =&gt; {
			return allPuginList.push( {
				plugin,
				action: __( 'Install &amp; Activate', 'astra-sites' ),
			} );
		} );
	}

	if ( notActivated?.length &gt; 0 ) {
		notActivated.map( ( plugin ) =&gt; {
			return allPuginList.push( {
				plugin,
				action: __( 'Activate', 'astra-sites' ),
			} );
		} );
	}
	const terms = (
		<a classname="st-link" href="https://store.brainstormforce.com/terms-and-conditions/" target="_blank" rel="noreferrer">
			Terms
		</a>
	);

	const privacyPolicy = (
		<a classname="st-link" href="https://store.brainstormforce.com/privacy-policy/" target="_blank" rel="noreferrer">
			Privacy Policy
		</a>
	);
	const manualPluginInstallation = () =&gt; {
		return (
			</p><form classname="install-plugins-form" onsubmit="{" recheckplugins>
				<h1>{ __( 'Required plugins missing', 'astra-sites' ) }</h1>
				<p>
					{ __(
						'Some required plugins could not be able to be installed/activated due to some limitations coming from this website&rsquo;s hosting service provider.',
						'astra-sites'
					) }
				</p>
				<p>
					{ __(
						'We request you to please install/update the following plugins to proceed.',
						'astra-sites'
					) }
				</p>
				<h5>{ __( 'Required plugins -', 'astra-sites' ) }</h5>
				<ul classname="manual-required-plugins-list">
					{ allPuginList.map( ( value, index ) =&gt; {
						return (
							<li key="{" index>
								{ value.plugin.name }
								&nbsp;-&nbsp;
								<a href="https://omii871.github.io/youtube/wp-content/plugins/astra-sites/inc/lib/onboarding/assets/src/steps/survey/%7B" value.plugin target="_blank" rel="noreferrer">
									{ value.action }
								</a>
							</li>
						);
					} ) }
				</ul>
				<button type="submit" classname="submit-survey-btn button-text d-flex-center-align">
					{ __( 'Start Importing', 'astra-sites' ) }
					{ ICONS.arrowRight }
				</button>
			</form>
		);
	};

	const thirtPartyPlugins =
		requiredPlugins !== null
			? requiredPlugins.third_party_required_plugins
			: [];
	const isThirtPartyPlugins = thirtPartyPlugins.length &gt; 0;

	const [ skipPlugins, setSkipPlugins ] = useState( isThirtPartyPlugins );

	const compatibilities = astraSitesVars?.compatibilities;
	const requirementsErrors = compatibilities.errors;
	let requirementWarning = compatibilities.warnings;

	if (
		requiredPlugins &amp;&amp;
		requiredPlugins.update_avilable_plugins.length &gt; 0
	) {
		const updatePluginsList = [];
		requiredPlugins.update_avilable_plugins.map( ( plugin ) =&gt; {
			return updatePluginsList.push( plugin.name );
		} );

		const output = [ '<ul>' ];
		updatePluginsList.forEach( function ( item ) {
			output.push( '<li>' + item + '</li>' );
		} );
		output.push( '</ul>' );

		const tooltipString =
			astraSitesVars?.compatibilities_data[ 'update-available' ];
		tooltipString.tooltip = tooltipString.tooltip.replace(
			'##LIST##',
			output.join( '' )
		);

		requirementWarning = {
			...requirementWarning,
			'update-available': tooltipString,
		};
	}

	let requirementsFlag;
	if ( shownRequirementOnce === true ) {
		requirementsFlag = false;
	} else {
		requirementsFlag =
			Object.keys( requirementsErrors ).length &gt; 0 ||
			Object.keys( requirementWarning ).length &gt; 0;
	}

	const [ showRequirementCheck, setShowRequirementCheck ] =
		useState( requirementsFlag );

	const updateFormDetails = ( field, value ) =&gt; {
		dispatch( {
			type: 'set',
			formDetails: {
				...formDetails,
				[ field ]: value,
			},
		} );
	};

	const setStartFlag = () =&gt; {
		const content = new FormData();
		content.append( 'action', 'astra-sites-set_start_flag' );
		content.append( '_ajax_nonce', astraSitesVars?._ajax_nonce );
		content.append( 'template_type', 'classic' );

		fetch( ajaxurl, {
			method: 'post',
			body: content,
		} );
	};

	const hasAgreedFirstTime = allowResetSite || firstImportStatus;

	const handleSurveyFormSubmit = ( e ) =&gt; {
		e.preventDefault();

		if ( hasAgreedFirstTime ) {
			setStartFlag();

			setTimeout( () =&gt; {
				dispatch( {
					type: 'set',
					currentIndex: currentIndex + 1,
				} );
			}, 500 );

			if ( analytics !== 'yes' ) {
				// Send data to analytics.
				const answer = analyticsFlag ? 'yes' : 'no';
				const optinAnswer = new FormData();
				optinAnswer.append( 'action', 'astra-sites-update-analytics' );
				optinAnswer.append(
					'_ajax_nonce',
					astraSitesVars?._ajax_nonce
				);
				optinAnswer.append( 'data', answer );

				fetch( ajaxurl, {
					method: 'post',
					body: optinAnswer,
				} )
					.then( ( response ) =&gt; response.json() )
					.then( ( response ) =&gt; {
						if ( response.success ) {
							starterTemplates.analytics = answer;
						}
					} );
			}

			if ( astraSitesVars?.subscribed === 'yes' ) {
				dispatch( {
					type: 'set',
					user_subscribed: true,
				} );
				return;
			}

			if ( ! formDetails.opt_in &amp;&amp; ! formDetails.email ) {
				return;
			}

			const templatePlugins = requiredPlugins.required_plugins;

			const pluginLists = [
				templatePlugins?.active,
				templatePlugins?.inactive,
				templatePlugins?.notinstalled,
				notInstalledList,
				notActivatedList,
			];

			const uniqueFeatures = Array.from(
				new Set(
					pluginLists
						.flatMap( ( list ) =&gt;
							Array.isArray( list ) ? list : []
						)
						.map( ( plugin ) =&gt; plugin?.slug )
						.filter( Boolean )
				)
			);

			const subscriptionFields = {
				EMAIL: formDetails.email,
				FIRSTNAME: formDetails.first_name,
				PAGE_BUILDER: builder,
				WP_USER_TYPE: formDetails.wp_user_type,
				BUILD_WEBSITE_FOR: formDetails.build_website_for,
				OPT_IN: formDetails.opt_in,
				FEATURES: uniqueFeatures,
			};

			const content = new FormData();
			content.append( 'action', 'astra-sites-update-subscription' );
			content.append( '_ajax_nonce', astraSitesVars?._ajax_nonce );
			content.append( 'data', JSON.stringify( subscriptionFields ) );

			fetch( ajaxurl, {
				method: 'post',
				body: content,
			} )
				.then( ( response ) =&gt; response.json() )
				.then( () =&gt; {
					dispatch( {
						type: 'set',
						user_subscribed: true,
					} );
				} );
		}
	};

	const handlePluginFormSubmit = ( e ) =&gt; {
		e.preventDefault();
		setSkipPlugins( false );
	};

	const recheckPlugins = ( e ) =&gt; {
		e.preventDefault();
		checkRequiredPlugins( storedState );
	};

	const agrText = sprintf(
		// translators: %1$s is a terms link, %2$s is a privacy policy link
		__( 'By continuing, you agree to our %1$s and %2$s.', 'astra-sites' ),
		'_terms_',
		'_privacy_'
	);
	const [ beforeTerms, afterTerms ] = agrText.split( '_terms_' );
	const [ beforePrivacy, afterPrivacy ] = afterTerms.split( '_privacy_' );

	const surveyForm = () =&gt; {
		return (
			<form classname="survey-form" onsubmit="{" handlesurveyformsubmit>
				{ astraSitesVars?.subscribed !== 'yes' &amp;&amp; (
					<surveyform formdetails="{" updateformdetails="{"></surveyform>
				) }
				<advancedsettings></advancedsettings>
				<button type="submit" classname="submit-survey-btn button-text d-flex-center-align" style="https://omii871.github.io/youtube/wp-content/plugins/astra-sites/inc/lib/onboarding/assets/src/steps/survey/{" hasagreedfirsttime backgroundcolor: cursor: color: : null>
					{ __( 'Submit &amp; Build My Website', 'astra-sites' ) }
					{ ! hasAgreedFirstTime
						? ICONS.arrowRightDisabled
						: ICONS.arrowRight }
				</button>
				<p classname="!text-zip-app-inactive-icon subscription-agreement-text text-center mt-4">
					{ beforeTerms }
					{ terms }
					{ beforePrivacy }
					{ privacyPolicy }
					{ afterPrivacy }
				</p>
			</form>
		);
	};

	const thirdPartyPluginList = () =&gt; {
		return (
			<form classname="required-plugins-form" onsubmit="{" handlepluginformsubmit>
				<h1>{ __( 'Required plugins missing', 'astra-sites' ) }</h1>
				<p>
					{ __(
						"This starter template requires premium plugins. As these are third party premium plugins, you'll need to purchase, install and activate them first.",
						'astra-sites'
					) }
				</p>
				<h5>{ __( 'Required plugins -', 'astra-sites' ) }</h5>
				<ul classname="third-party-required-plugins-list">
					{ thirtPartyPlugins.map( ( plugin, index ) =&gt; {
						return (
							<li data-slug="{" plugin.slug data-init="{" plugin.init data-name="{" plugin.name key="{" index>
								<a href="https://omii871.github.io/youtube/wp-content/plugins/astra-sites/inc/lib/onboarding/assets/src/steps/survey/%7B" plugin.link target="_blank" rel="noreferrer">
									{ plugin.name }
								</a>
							</li>
						);
					} ) }
				</ul>
				<button type="submit" classname="submit-survey-btn button-text d-flex-center-align">
					{ __( 'Skip &amp; Start Importing', 'astra-sites' ) }
					{ ICONS.arrowRight }
				</button>
			</form>
		);
	};

	const handleRequirementCheck = () =&gt; {
		setShowRequirementCheck( false );
		dispatch( {
			type: 'set',
			shownRequirementOnce: true,
		} );
	};

	const hardRequirement = () =&gt; {
		return (
			<div classname="requirement-check-wrap">
				<h1 classname="text-3xl font-bold text-zip-app-heading max-md:!text-3xl max-sm:!text-2xl">
					{ __( "We're Almost There!", 'astra-sites' ) }
				</h1>

				<p>
					{ __(
						'The Starter Template you are trying to import requires a few plugins to be installed and activated. Your current PHP version does not match the minimum requirement for these plugins.',
						'astra-sites'
					) }
				</p>

				<p classname="current-php-version">
					<strong>{ `Current PHP version: ${ phpVersion }` }</strong>
				</p>

				<ul classname="requirement-check-list">
					{ Object.values( requiredPlugins.incompatible_plugins ).map(
						( value, index ) =&gt; {
							return (
								<li key="{" index>
									<div classname="requirement-list-item">
										{ `${ value.name } - PHP Version: ${ value.min_php_version } or higher` }
									</div>
								</li>
							);
						}
					) }
				</ul>
			</div>
		);
	};

	const optionalRequirement = () =&gt; {
		return (
			<div classname="requirement-check-wrap">
				<h1 classname="text-3xl font-bold text-zip-app-heading max-md:!text-3xl max-sm:!text-2xl !text-center">
					{ __( "We're Almost There!", 'astra-sites' ) }
				</h1>

				<p>
					{ __(
						"You're close to importing the template. To complete the process, please clear the following conditions.",
						'astra-sites'
					) }
				</p>

				<ul classname="requirement-check-list">
					{ Object.keys( requirementsErrors ).length &gt; 0 &amp;&amp;
						Object.values( requirementsErrors ).map(
							( value, index ) =&gt; {
								return (
									<li key="{" index>
										<div classname="requirement-list-item">
											{ value.title }
											<tooltip interactive="{" true content="{" dangerouslysetinnerhtml="{" __html: value.tooltip></tooltip>
												}
											&gt;
												{ ICONS.questionMark }
											
										</div>
									</li>
								);
							}
						) }
					{ Object.keys( requirementWarning ).length &gt; 0 &amp;&amp;
						Object.values( requirementWarning ).map(
							( value, index ) =&gt; {
								return (
									<li key="{" index>
										<div classname="requirement-list-item">
											{ value.title }
											<tooltip interactive="{" true content="{" dangerouslysetinnerhtml="{" __html: value.tooltip></tooltip>
												}
											&gt;
												{ ICONS.questionMark }
											
										</div>
									</li>
								);
							}
						) }
				</ul>
				<button classname="submit-survey-btn button-text d-flex-center-align" onclick="{" handlerequirementcheck disabled object.keys requirementserrors> 0
							? true
							: false
					}
				&gt;
					<span classname="leading-[15px]">
						{ __( 'Skip &amp; Continue', 'astra-sites' ) }
					</span>
					{ ICONS.arrowRight }
				</button>
			</div>
		);
	};

	const fileSystemPermissionRequirement = () =&gt; {
		const {
			is_readable: isReadable,
			is_writable: isWritable,
			is_wp_filesystem: isFilesystem,
		} = fileSystemPermissions.permissions;

		return (
			<div classname="requirement-check-wrap">
				<h1>{ __( "We're Almost There!", 'astra-sites' ) }</h1>

				<p>
					{ __(
						'The import process was interrupted due to the lack of file-system permissions from your host. It is required to import images, XML files, and more required for the template to work.',
						'astra-sites'
					) }
				</p>

				<p classname="current-file-system-permissions">
					<strong>
						{ __(
							'Current file-system permissions:',
							'astra-sites'
						) }
					</strong>
				</p>

				<ul classname="requirement-check-list">
					<li>
						<div classname="requirement-list-item">
							{ __( 'Read Permissions:', 'astra-sites' ) }
							<span classname="{" isreadable :></span>
						</div>
					</li>
					<li>
						<div classname="requirement-list-item">
							{ __( 'Write Permissions:', 'astra-sites' ) }
							<span classname="{" iswritable :></span>
						</div>
					</li>
					<li>
						<div classname="requirement-list-item">
							{ __(
								'WP_Filesystem Permissions:',
								'astra-sites'
							) }
							<span classname="{" isfilesystem :></span>
						</div>
					</li>
				</ul>

				<p>
					{ __(
						'Please contact the hosting service provider to help you update the permissions so that you can successfully import a complete template.',
						'astra-sites'
					) }
				</p>
			</div>
		);
	};

	let defaultStepContent = surveyForm();

	if ( pluginInstallationAttempts &gt; 2 &amp;&amp; allPuginList.length &gt; 0 ) {
		// If plugin installation fails more than 3 times.
		defaultStepContent = manualPluginInstallation();
	} else if (
		fileSystemPermissions !== null &amp;&amp;
		! Object.values( fileSystemPermissions.permissions ).every(
			( value ) =&gt; value === true
		)
	) {
		defaultStepContent = fileSystemPermissionRequirement();
	} else if (
		null !== requiredPlugins &amp;&amp;
		Object.keys( requiredPlugins.incompatible_plugins ).length &gt; 0
	) {
		defaultStepContent = hardRequirement();
	} else if ( showRequirementCheck ) {
		defaultStepContent = optionalRequirement();
	} else if ( skipPlugins ) {
		defaultStepContent = thirdPartyPluginList();
	}

	return (
		<defaultstep content="{">
					<div classname="my-4">
						<h1 classname="mb-4 text-3xl font-bold text-zip-app-heading max-md:!text-3xl max-sm:!text-2xl">
							{ __( 'Okay, just one last step&hellip;', 'astra-sites' ) }
						</h1>
					</div>
					<div classname="survey-container">
						{ ' ' }
						{ defaultStepContent }{ ' ' }
					</div>
					<previoussteplink>
						<div classname="flex text-center justify-center items-center gap-2">
							<arrowlefticon height="{" strokewidth="{"></arrowlefticon>
							{ __( 'Back', 'astra-sites' ) }
						</div>
					</previoussteplink>
				&gt;
			}
		/&gt;
	);
};

export default Survey;
</defaultstep></body></html>
