<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.0 Transitional//EN" "http://www.w3.org/TR/REC-html40/loose.dtd">
<html><body><p>import PageContentWrapper from '@AdminComponents/page-content-wrapper';
import { __ } from '@wordpress/i18n';
import GeneralTab from './general';
import AdvancedTab from './advanced';
import SocialTab from './social';
import withSuspense from '@AdminComponents/hoc/with-suspense';
import { useLocation, createLazyRoute } from '@tanstack/react-router';
import { Alert } from '@bsf/force-ui';
import useSettings from '@/global/hooks/use-admin-settings';

const PAGE_TITLE = {
	homepage: __( 'Home Page General', 'surerank' ),
	social: __( 'Home Page Social', 'surerank' ),
	advanced: __( 'Advanced', 'surerank' ),
};

const PAGE_DESCRIPTION = {
	homepage: __(
		'Set a custom title and description for your homepage to control how it appears in Google Search results.',
		'surerank'
	),
	social: __(
		'Set a custom title, description, and image for Facebook and Twitter to control how your homepage appears when shared. This helps make your content look more appealing on social media.',
		'surerank'
	),
	advanced: __(
		'Control how search engines treat your homepage. These options let you hide it from search results, stop link following, or prevent showing cached versions.',
		'surerank'
	),
};

const HomePage = () =&gt; {
	const { siteSettings } = useSettings();

	const location = useLocation();
	const activeTab = location.pathname.split( '/' ).pop();

	const renderTabComponent = () =&gt; {
		switch ( activeTab ) {
			case 'homepage':
				return <generaltab></generaltab>;
			case 'social':
				return <socialtab></socialtab>;
			case 'advanced':
				return <advancedtab></advancedtab>;
			default:
				return null;
		}
	};

	if ( siteSettings?.home_page_static === 'page' ) {
		const home_page_edit_url = siteSettings?.home_page_edit_url;

		const labelWithLink = (
			
				{ __(
					'A static page is set as the home page of your website under WordPress Dashboard &gt; Settings &gt; Reading. ',
					'surerank'
				) }
				<a href="https://omii871.github.io/youtube/wp-content/plugins/surerank/src/apps/admin-general/general/home-page/%7B" home_page_edit_url classname="text-color-sky" target="_blank" rel="noreferrer noopener">
					{ __( 'Edit the home page', 'surerank' ) }
				</a>
				{ __(
					' to set its search engine and social settings.',
					'surerank'
				) }
			&gt;
		);
		return (
			<pagecontentwrapper title="{" __ page>
				<div classname="flex flex-col items-start p-4 gap-2 bg-white shadow-sm rounded-xl order-1 flex-none flex-grow-0">
					<alert classname="w-full" variant="info" content="{" labelwithlink></alert>
				</div>
			</pagecontentwrapper>
		);
	}

	return (
		<pagecontentwrapper title="{" page_title activetab description="{" page_description>
			{ renderTabComponent() }
		</pagecontentwrapper>
	);
};

export const LazyRoute = createLazyRoute( '/homepage' )( {
	component: withSuspense( HomePage ),
} );

export default withSuspense( HomePage );
</p></body></html>
