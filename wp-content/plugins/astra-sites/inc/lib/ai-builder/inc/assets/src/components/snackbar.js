<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.0 Transitional//EN" "http://www.w3.org/TR/REC-html40/loose.dtd">
<html><body><p>import { classNames } from '../utils/helpers';

const Snackbar = ( { type, icon, message, ctaLink, ctaText, rounded = 4 } ) =&gt; {
	const typeClassName = {
		warning: {
			text: 'text-credit-warning',
			icon: 'text-credit-warning',
			background: 'bg-credit-warning/5',
		},
		error: {
			text: 'text-credit-danger',
			icon: 'text-credit-danger',
			background: 'bg-credit-danger/5',
		},
		info: {
			text: 'text-body-text',
			icon: 'text-accent-st',
			background: 'bg-background-secondary',
		},
	};

	const borderRadiusClassName = {
		4: 'rounded',
		6: 'rounded-md',
		8: 'rounded-lg',
	};

	return (
		</p><div classname="{" classnames pr-4 py-3 typeclassname type borderradiusclassname rounded>
			<div classname="flex items-center gap-2">
				<div classname="{" classnames items-center typeclassname type>
					{ !! icon &amp;&amp; icon }
				</div>
				<div classname="flex-1 flex justify-between items-center">
					<p classname="{" classnames m-0 typeclassname type>
						{ !! message &amp;&amp; message }
					</p>
					<p classname="text-sm m-0">
						{ !! ctaLink &amp;&amp; (
							<a href="https://omii871.github.io/youtube/wp-content/plugins/astra-sites/inc/lib/ai-builder/inc/assets/src/components/%7B" ctalink target="_blank" classname="whitespace-nowrap font-normal !text-nav-active" rel="noreferrer">
								{ !! ctaText &amp;&amp; ctaText }
							</a>
						) }
					</p>
				</div>
			</div>
		</div>
	);
};

export default Snackbar;
</body></html>
