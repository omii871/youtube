<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.0 Transitional//EN" "http://www.w3.org/TR/REC-html40/loose.dtd">
<html><body><p>import { __ } from '@wordpress/i18n';
import { useState, Fragment, useMemo } from '@wordpress/element';
import {
	FacebookIcon,
	TwitterIcon,
	InstagramIcon,
	LinkedInIcon,
	YouTubeIcon,
	PinterestIcon,
	TikTokIcon,
	MediumIcon,
	TumblrIcon,
	ThreadsIcon,
	YelpIcon,
	WhatsAppIcon,
	TelegramIcon,
	BlueSkyIcon,
} from '../icons';
import { Button, DropdownMenu, Title } from '@bsf/force-ui';
import { PlusIcon, LinkIcon } from 'lucide-react';
import StepNavButtons from '../components/nav-buttons';
import { useOnboardingState } from '@Onboarding/store';
import { focusHelper } from '../utils';

const iconMap = {
	facebook: FacebookIcon,
	twitter: TwitterIcon,
	instagram: InstagramIcon,
	linkedin: LinkedInIcon,
	youtube: YouTubeIcon,
	pinterest: PinterestIcon,
	tiktok: TikTokIcon,
	medium: MediumIcon,
	tumblr: TumblrIcon,
	threads: ThreadsIcon,
	yelp: YelpIcon,
	whatsapp: WhatsAppIcon,
	telegram: TelegramIcon,
	link: LinkIcon,
	bluesky: BlueSkyIcon,
};

const socialProfiles = surerank_admin_common?.social_profiles
	.filter( ( item ) =&gt; ! item.extra )
	.map( ( item ) =&gt; ( {
		...item,
		icon: iconMap[ item.id ] || iconMap.link,
	} ) );

const dropdownOptions = surerank_admin_common?.social_profiles
	.filter( ( item ) =&gt; item.extra )
	.map( ( item ) =&gt; ( {
		...item,
		icon: iconMap[ item.id ] || iconMap.link,
	} ) );

/**
 * Get the initial list of social profiles to render.
 *
 * @param {Object} formState - The form state.
 * @return {Array} The initial list of social profiles to render.
 */
const getInitialList = ( formState ) =&gt; {
	return [
		...socialProfiles,
		...dropdownOptions.filter( ( item ) =&gt; item.id in formState ),
	];
};

const SocialProfiles = () =&gt; {
	const [ { socialProfilesURLs = {} }, dispatch ] = useOnboardingState();
	// Local states
	const [ formState, setFormState ] = useState( socialProfilesURLs );
	const [ socialProfileLists, setSocialProfileLists ] = useState(
		getInitialList( formState )
	);

	const handleSubmit = ( event ) =&gt; {
		event.preventDefault();
	};

	const handleAddProfileToList = ( socialMediaItem ) =&gt; {
		setSocialProfileLists( ( prev ) =&gt; [ ...prev, socialMediaItem ] );
	};

	const filteredDropdownOptions = useMemo( () =&gt; {
		return dropdownOptions.filter(
			( item ) =&gt;
				! socialProfileLists.some(
					( listItem ) =&gt; listItem.id === item.id
				)
		);
	}, [ socialProfileLists ] );

	const handleChange = ( id ) =&gt; ( event ) =&gt; {
		setFormState( ( prev ) =&gt; ( { ...prev, [ id ]: event.target.value } ) );
	};

	const handleSaveForm = () =&gt; {
		dispatch( {
			socialProfilesURLs: formState,
		} );
	};

	return (
		</p><form classname="flex flex-col gap-6" onsubmit="{" handlesubmit>
			<div classname="space-y-1">
				<title tag="h4" title="{" __ profiles size="md"></title>
				<p classname="w-full">
					{ __(
						'Please enter your social media profiles. These links can appear in the knowledge panel of the search results for your website.',
						'surerank'
					) }
				</p>
			</div>
			{ /* Settings / options */ }
			<div classname="flex flex-col border border-solid border-border-subtle rounded-lg p-1">
				{ socialProfileLists.map(
					( { label, id, placeholder, icon: Icon }, index ) =&gt; (
						<fragment key="{" id>
							<div classname="flex items-center gap-3 w-full p-2.5">
								<div classname="flex items-center gap-3 w-2/4">
									<icon classname="size-5"></icon>
									<span classname="hidden md:inline-block text-field-label text-sm font-medium whitespace-nowrap">
										{ label }
									</span>
								</div>
								<input classname="text-sm text-right text-text-primary placeholder:text-text-tertiary w-full border-none bg-transparent focus:outline-none focus:ring-0" placeholder="{" onchange="{" handlechange id value="{" formstate ... index="==" ref: focushelper>
							</div>
							{ ( !! filteredDropdownOptions.length ||
								index 
									<hr classname="border-border-subtle border-b border-t-0 border-x-0 my-1 w-full">
								
							) }
						</fragment>
					)
				) }
				{ !! filteredDropdownOptions.length &amp;&amp; (
					<dropdownmenu>
						<dropdownmenu.trigger>
							<button type="button" variant="ghost" classname="w-max my-2 mx-auto" size="xs" icon="{"></button> }
								iconPosition="right"
							&gt;
								{ __( 'Add another profile', 'surerank' ) }
							
						</dropdownmenu.trigger>
						<dropdownmenu.portal id="surerank-root">
							<dropdownmenu.contentwrapper>
								<dropdownmenu.content classname="w-60">
									<dropdownmenu.list>
										{ filteredDropdownOptions.map(
											( {
												label,
												id,
												icon: Icon,
												placeholder,
											} ) =&gt; (
												<dropdownmenu.item key="{" id onclick="{">
														handleAddProfileToList(
															{
																label,
																id,
																icon: Icon,
																placeholder,
															}
														)
													}
												&gt;
													<div classname="flex items-center gap-3 w-full">
														<icon classname="size-4"></icon>
														<span classname="text-field-label text-sm font-medium">
															{ label }
														</span>
													</div>
												</dropdownmenu.item>
											)
										) }
									</dropdownmenu.list>
								</dropdownmenu.content>
							</dropdownmenu.contentwrapper>
						</dropdownmenu.portal>
					</dropdownmenu>
				) }
			</div>
			<stepnavbuttons classname="my-0" nextprops="{" onclick: handlesaveform backprops="{"></stepnavbuttons>
		</form>
	);
};

export default SocialProfiles;
</body></html>
