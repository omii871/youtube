<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.0 Transitional//EN" "http://www.w3.org/TR/REC-html40/loose.dtd">
<html><body><p>import { __ } from '@wordpress/i18n';
import { LightningIcon } from '../ui/icons';
import { classNames } from '../helpers';
import { showAISitesNotice } from '../utils/helpers';

const AISitesNotice = ( { className, ...props } ) =&gt; {
	// handle not logged in case.

	if (
		typeof aiBuilderVars?.zip_plans !== 'object' ||
		aiBuilderVars?.show_zip_plan !== '1'
	) {
		return;
	}

	return (
		
			{ showAISitesNotice() &amp;&amp; (
				</p><div classname="{" classnames gap-1 border border-alert-error bg-alert-error-bg rounded-md flex mb-6 ...props>
					<span classname="self-start mt-1">
						<lightningicon></lightningicon>
					</span>
					<div classname="w-full flex flex-col md:flex-row gap-1 justify-between">
						<p classname="text-body-text text-sm">
							<span classname="font-semibold pr-1">
								{ __(
									"You've almost reached AI site-building limit.",
									'ai-builder'
								) }
							</span>
							{ __(
								'Upgrade with add-ons to unlock more.',
								'ai-builder'
							) }
						</p>
						<a href="https://omii871.github.io/youtube/wp-content/plugins/astra-sites/inc/lib/ai-builder/inc/assets/src/components/%7B" wpapisettings target="_blank" rel="noreferrer" classname="no-underline">
							<div classname="p-0 font-semibold  text-sm text-blue-crayola min-w-fit w-max">
								{ __( 'Buy Add-ons', 'ai-builder' ) }
							</div>
						</a>
					</div>
				</div>
			) }
		&gt;
	);
};

export default AISitesNotice;
</body></html>
