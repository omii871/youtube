<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.0 Transitional//EN" "http://www.w3.org/TR/REC-html40/loose.dtd">
<html><body><p>import { __ } from '@wordpress/i18n';
import { Button, Container, Label, Title } from '@bsf/force-ui';
import { Check, ChevronRight } from 'lucide-react';
import { useNavigateStep } from '@Onboarding/hooks';

const onboardingBanner =
	surerank_globals.admin_assets_url + '/images/onboarding-welcome-banner.svg';

const features = [
	__( 'Identify and fix SEO issues effortlessly', 'surerank' ),
	__(
		"Analyze and track website's performance in search engines",
		'surerank'
	),
	__( 'Optimize website for better rankings', 'surerank' ),
	__( 'Use AI to optimize your website', 'surerank' ),
	__( 'Enjoy an easy, simple setup', 'surerank' ),
];

const Welcome = () =&gt; {
	const { nextStep } = useNavigateStep();

	const handleSubmit = ( event ) =&gt; {
		event.preventDefault();
	};

	return (
		</p><form classname="flex flex-col gap-4" onsubmit="{" handlesubmit>
			<container classname="p-1 gap-1.5" direction="column">
				<title tag="h2" title="{" __ to surerank size="lg" classname="[&amp;&gt;h2]:text-3xl [&amp;&gt;h2]:leading-9.5"></title>
				<label tag="p" classname="text-base">
					{ __(
						'Set up your site&rsquo;s SEO easily&mdash;no advanced skills needed!',
						'surerank'
					) }
				</label>
			</container>
			{ /* Banner */ }
			<div classname="p-1">
				<img src="https://omii871.github.io/youtube/wp-content/plugins/surerank/src/apps/admin-onboarding/steps/%7B" onboardingbanner alt="Onboarding Welcome Banner" classname="w-full h-full object-cover">
			</div>
			{ /* Feature list */ }
			<ul classname="space-y-1.5 p-1" aria-label="{" __ of features>
				{ features.map( ( feature ) =&gt; (
					<li key="{" feature classname="flex items-center gap-2" aria-label="{">
						<check classname="size-3 text-icon-primary" aria-hidden="true"></check>
						<label size="sm" tag="p" classname="font-medium text-field-label">
							{ feature }
						</label>
					</li>
				) ) }
			</ul>
			<hr classname="border-t border-b-0 border-x-0 border-solid border-border-subtle m-1">
			<div classname="p-1">
				<button variant="primary" size="md" icon="{"></button> }
					iconPosition="right"
					onClick={ () =&gt; nextStep() }
					className="w-fit mr-auto"
				&gt;
					{ __( "Let's Get Started", 'surerank' ) }
				
			</div>
		</form>
	);
};

export default Welcome;
</body></html>
