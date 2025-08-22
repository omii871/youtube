<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.0 Transitional//EN" "http://www.w3.org/TR/REC-html40/loose.dtd">
<html><body><p>import React from 'react';
import { __ } from '@wordpress/i18n';
import { decodeEntities } from '@wordpress/html-entities';
import { useStateValue } from '../../store/store';
import Button from '../../components/button/button';
import './style.scss';
import { getSupportLink } from '../../utils/functions';

const ErrorScreen = () =&gt; {
	const [
		{ importErrorMessages, currentIndex, tryAgainCount, templateId },
		dispatch,
	] = useStateValue();

	const supportLink = getSupportLink(
		templateId,
		importErrorMessages.errorText
	);

	const tryAgain = () =&gt; {
		dispatch( {
			type: 'set',
			// Reset errors.
			importErrorMessages: {},
			importErrorResponse: [],
			importError: false,

			// Try again count.
			tryAgainCount: tryAgainCount + 1,

			// Reset import flags.
			xmlImportDone: false,
			resetData: [],
			importStart: false,
			importEnd: false,
			importPercent: 0,
			requiredPluginsDone: false,
			notInstalledList: [],
			notActivatedList: [],

			// Go to previous step.
			currentIndex: currentIndex - 1,
		} );
	};

	const solutionHeading = (
		</p><h5 classname="ist-import-error-solution-heading">
			{ __( 'Still no luck? Other potential solution:', 'astra-sites' ) }
		</h5>
	);

	return (
		<div classname="ist-import-error">
			<div classname="ist-import-progress-info">
				<div classname="ist-import-progress-info-text label-text">
					{ __( 'Sorry, something went wrong.', 'astra-sites' ) }
				</div>
			</div>
			<div classname="ist-import-error-box">
				<h5 classname="ist-import-error-box-heading">
					{ __( 'What went wrong?', 'astra-sites' ) }
				</h5>
				<div classname="ist-import-error-wrap ist-import-error-primary-wrap">
					{ importErrorMessages.primaryText &amp;&amp; (
						<p classname="website-import-subtitle">
							{ importErrorMessages.primaryText }
						</p>
					) }
				</div>
				{ importErrorMessages.secondaryText &amp;&amp; (
					<div classname="ist-import-error-wrap ist-import-error-secondary-wrap">
						{ importErrorMessages.secondaryText &amp;&amp; (
							<p dangerouslysetinnerhtml="{" __html: importerrormessages.secondarytext></p>
						) }
					</div>
				) }
				<div classname="ist-import-error-wrap ist-import-error-text-wrap">
					<h5 classname="ist-import-error-text-heading">
						{ __(
							'More technical information from console:',
							'astra-sites'
						) }
					</h5>
					{ importErrorMessages.errorText &amp;&amp;
						'object' !== typeof importErrorMessages.errorText &amp;&amp; (
							<p classname="ist-import-error-text">
								{ importErrorMessages.errorText }
							</p>
						) }
					{ importErrorMessages.errorText &amp;&amp;
						'object' === typeof importErrorMessages.errorText &amp;&amp; (
							<div classname="ist-import-error-text">
								<pre>
									{ JSON.stringify(
										importErrorMessages.errorText,
										undefined,
										2
									) }
								</pre>
							</div>
						) }
				</div>
			</div>
			{ importErrorMessages.tryAgain &amp;&amp; tryAgainCount 
					{ __( 'Click here and we&rsquo;ll try again', 'astra-sites' ) }
				
			) }
			<div classname="ist-import-error-solution-wrapper">
				{ importErrorMessages.solutionText &amp;&amp; (
					
						{ solutionHeading }
						<p classname="ist-import-error-solution" dangerouslysetinnerhtml="{" __html: importerrormessages.solutiontext></p>
					&gt;
				) }
				{ ( ! importErrorMessages.solutionText &amp;&amp;
					! importErrorMessages.tryAgain ) ||
					( importErrorMessages.tryAgain &amp;&amp; tryAgainCount &gt; 1 &amp;&amp; (
						
							{ solutionHeading }
							<p classname="ist-import-error-solution">
								{ decodeEntities(
									__(
										'Please report this error&nbsp;',
										'astra-sites'
									)
								) }
								<a href="https://omii871.github.io/youtube/wp-content/plugins/astra-sites/inc/lib/onboarding/assets/src/components/error/%7B" supportlink target="_blank" rel="noreferrer">
									{ 'here' }
								</a>
								{ decodeEntities(
									__(
										'&nbsp;so we can fix it.',
										'astra-sites'
									)
								) }
							</p>
						&gt;
					) ) }
			</div>
		</div>
	);
};

export default ErrorScreen;
</body></html>
