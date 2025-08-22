<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.0 Transitional//EN" "http://www.w3.org/TR/REC-html40/loose.dtd">
<html><body><p>import React from 'react';
import Tooltip from '../../components/tooltip/tooltip';
import { __ } from '@wordpress/i18n';
// import { decodeEntities } from '@wordpress/html-entities';
import { useStateValue } from '../../store/store';
import ICONS from '../../../icons';
import { whiteLabelEnabled } from '../../utils/functions';
const { themeStatus, firstImportStatus, analytics } = starterTemplates;
import ToggleSwitch from '../../components/toggle-switch';
import FilesAndFolderImg from '../../../images/files-folder.png';
import { Checkbox, Field, Label } from '@headlessui/react';
const AdvancedSettings = () =&gt; {
	const [
		{ reset, themeActivateFlag, analyticsFlag, allowResetSite },
		dispatch,
	] = useStateValue();

	const updateAnalyticsFlag = () =&gt; {
		dispatch( {
			type: 'set',
			analyticsFlag: ! analyticsFlag,
		} );
	};
	const updateThemeFlag = () =&gt; {
		dispatch( {
			type: 'set',
			themeActivateFlag: ! themeActivateFlag,
			customizerImportFlag: ! themeActivateFlag,
		} );
	};

	const updateResetValue = () =&gt; {
		dispatch( {
			type: 'set',
			reset: ! reset,
		} );
	};

	const updateAllowResetSite = () =&gt; {
		dispatch( {
			type: 'set',
			allowResetSite: ! allowResetSite,
		} );
	};

	const showAdvancedOption =
		( ! whiteLabelEnabled() &amp;&amp; analytics !== 'yes' ) ||
		'installed-and-active' !== themeStatus;

	return (
		</p><div classname="survey-form-advanced-wrapper show-section">
			<p classname="label-text row-label !mb-2" role="presentation">
				{ __( 'Advanced Options', 'astra-sites' ) }
			</p>
			{ showAdvancedOption &amp;&amp; (
				<div classname="survey-advanced-section mb-6">
					<div classname="border border-solid border-border-primary rounded-md grid grid-cols-1 !divide-y !divide-border-primary divide-solid divide-x-0">
						{ 'installed-and-active' !== themeStatus &amp;&amp; (
							<div classname="items-center py-3 px-4 grid grid-cols-[1fr_min-content] !gap-2">
								<div classname="flex-1 flex items-center space-x-2">
									<h6 classname="text-sm !leading-6 text-zip-app-heading">
										{ ' ' }
										{ __(
											'Install &amp; Activate Astra Theme',
											'astra-sites'
										) }
									</h6>
									<tooltip content="{" __ import the site in original format you would need astra theme activated. can it with any other but might lose some of design settings and look a bit different.>
										{ ICONS.questionMarkNoFill }
									</tooltip>
								</div>
								<div>
									<toggleswitch onchange="{" updatethemeflag value="{" themeactivateflag requiredclass="{" :></toggleswitch>
								</div>
							</div>
						) }
						{ ! whiteLabelEnabled() &amp;&amp; analytics !== 'yes' &amp;&amp; (
							<div classname="items-center py-3 px-4 grid grid-cols-[1fr_min-content] gap-4">
								<div classname="flex-1 flex items-center space-x-2">
									<h6 classname="text-sm !leading-6 text-zip-app-heading">
										{ ' ' }
										{ __(
											'Share Non-Sensitive Data',
											'astra-sites'
										) }
									</h6>
									<tooltip interactive="{" true content="{">
												{ __(
													'Help our developers build better templates and products for you by sharing anonymous and non-sensitive data about your website.',
													'astra-sites'
												) }{ ' ' }
												<a href="https://store.brainstormforce.com/usage-tracking/?utm_source=wp_dashboard&amp;utm_medium=general_settings&amp;utm_campaign=usage_tracking" target="_blank" rel="noreferrer noopener">
													{ __(
														'Learn More',
														'astra-sites'
													) }
												</a>
											</tooltip></div>
										}
									&gt;
										{ ICONS.questionMarkNoFill }
									
								</div>
								<div>
									<toggleswitch onchange="{" updateanalyticsflag value="{" analyticsflag requiredclass="{" :></toggleswitch>
								</div>
							</div>
						) }
					</div>
				</div>
			) }
			{ 'yes' === firstImportStatus ? (
				<div classname="flex items-center rounded-md p-4 border-solid border gap-6 border-[#FB7E0A1F] bg-[#FB7E0A0F] max-sm:flex-col">
					<div classname="mb-1">
						<p classname="text-sm text-body-text !leading-6 max-sm:text-center">
							{ __(
								'It looks like you already have a website created with Starter Templates. Check this box to keep your existing content and images.',
								'astra-sites'
							) }
						</p>
						<field classname="flex mt-2 gap-2">
							<checkbox classname="group flex justify-center items-center border-2 size-4 border-solid border-border-secondary rounded data-[checked]:bg-accent-st-secondary data-[checked]:border-accent-st-secondary" checked reset onchange="{" updateresetvalue>
								<svg width="10" height="8" viewbox="0 0 10 8" fill="none" xmlns="http://www.w3.org/2000/svg" classname="opacity-0 group-data-[checked]:opacity-100">
									<path d="M9 1L3.5 6.5L1 4" stroke="white" strokewidth="1.4" strokelinecap="round" strokelinejoin="round"></path>
								</svg>
							</checkbox>
							<label classname="text-sm leading-4 text-nav-active font-medium cursor-pointer">
								{ __( 'Keep existing data!', 'astra-sites' ) }
							</label>
						</field>
					</div>
					<div classname="max-w-[104px] w-full">
						<img classname="w-full" src="https://omii871.github.io/youtube/wp-content/plugins/astra-sites/inc/lib/onboarding/assets/src/steps/survey/%7B" filesandfolderimg alt="">
					</div>
				</div>
			) : (
				<div classname="flex items-center rounded-md p-4 border-solid border gap-6 border-[#FB7E0A1F] bg-[#FB7E0A0F] max-sm:flex-col">
					<div classname="mb-1">
						<p classname="text-sm text-body-text !leading-6 max-sm:text-center">
							{ __(
								'This will overwrite your site settings and add new content. You might want to backup your site before proceeding.',
								'astra-sites'
							) }
						</p>
						<field classname="flex mt-2 gap-2">
							<checkbox classname="group flex justify-center items-center border-2 size-4 border-solid border-border-secondary rounded data-[checked]:bg-accent-st-secondary data-[checked]:border-accent-st-secondary" checked allowresetsite onchange="{" updateallowresetsite>
								<svg width="10" height="8" viewbox="0 0 10 8" fill="none" xmlns="http://www.w3.org/2000/svg" classname="opacity-0 group-data-[checked]:opacity-100">
									<path d="M9 1L3.5 6.5L1 4" stroke="white" strokewidth="1.4" strokelinecap="round" strokelinejoin="round"></path>
								</svg>
							</checkbox>
							<label classname="text-sm leading-4 text-nav-active font-medium cursor-pointer">
								{ __(
									"I understand, let's go!",
									'astra-sites'
								) }
							</label>
						</field>
					</div>
					<div classname="max-w-[104px] w-full">
						<img classname="w-full" src="https://omii871.github.io/youtube/wp-content/plugins/astra-sites/inc/lib/onboarding/assets/src/steps/survey/%7B" filesandfolderimg alt="">
					</div>
				</div>
			) }
		
	);
};

export default AdvancedSettings;
</body></html>
