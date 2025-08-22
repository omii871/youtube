<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.0 Transitional//EN" "http://www.w3.org/TR/REC-html40/loose.dtd">
<html><body><p>import { __ } from '@wordpress/i18n';
import { ChevronRight } from 'lucide-react';
import { Button, Text, Title } from '@bsf/force-ui';
import { exitURL } from '@Onboarding/components/exit-button';

const imagesURL = `${ window.surerank_globals.admin_assets_url }/images/`;

const Success = () =&gt; {
	const handleSubmit = ( event ) =&gt; {
		event.preventDefault();
	};

	const handleClick = () =&gt; {
		window.open( exitURL, '_self', 'noopener,noreferrer' );
	};

	return (
		</p><form classname="flex flex-col gap-4" onsubmit="{" handlesubmit>
			<div classname="flex gap-4 flex-col md:flex-row">
				<div classname="space-y-6 max-w-full md:max-w-[75%]">
					<div classname="space-y-2">
						<title tag="h3" title="{" __ good to go size="lg"></title>
						<p>
							{ __(
								"You've successfully set up SureRank, the first step to SEO success and your site is ready. Now, let's optimize your website for search engines.",
								'surerank'
							) }
						</p>
					</div>
					<div classname="space-y-2">
						<text as="p" size="{" weight="{">
							{ __(
								"Here's What You Can Do With SureRank:",
								'surerank'
							) }
						</text>
						<ul classname="list-none space-y-2 ">
							{ [
								__( 'Fix SEO issues, if any', 'surerank' ),
								__( 'Analyze your website', 'surerank' ),
								__( 'Optimize your content', 'surerank' ),
							].map( ( item ) =&gt; (
								<li key="{" item classname="flex items-center gap-1.5 justify-start">
									<chevronright classname="size-3.5"></chevronright>
									<span classname="text-sm font-normal text-field-label">
										{ item }
									</span>
								</li>
							) ) }
						</ul>
					</div>
				</div>
				<img classname="w-1/2 md:w-[25%] h-full mx-auto" src="https://omii871.github.io/youtube/wp-content/plugins/surerank/src/apps/admin-onboarding/steps/%7B" imagesurl alt="{" __ system and a rocket>
			</div>
			{ /* Footer */ }
			<div>
				{ /* Divider */ }
				<hr classname="border-b border-t-0 border-x-0 border-solid border-border-subtle mt-0 mb-4">
				<div classname="flex justify-start gap-3 flex-col md:flex-row">
					{ /* Action button */ }
					<button variant="primary" size="md" classname="w-full md:w-auto" onclick="{" handleclick>
						{ __( 'Go To Dashboard', 'surerank' ) }
					</button>
				</div>
			</div>
		</form>
	);
};

export default Success;
</body></html>
