<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.0 Transitional//EN" "http://www.w3.org/TR/REC-html40/loose.dtd">
<html><body><p>import { Container, Label, toast } from '@bsf/force-ui';
import { __ } from '@wordpress/i18n';
import { useEffect, useCallback } from '@wordpress/element';
import { usePluginsAndThemes } from './use-plugins-and-themes';
import { PluginCard } from './plugin-card';
import {
	themesAndPlugins,
	dashboard_plugins_sequence,
} from './dashboard-constants';
import { Ticket, MessageSquare, Star, Info } from 'lucide-react';
import { SureRankMonoLogo } from '@/global/components/icons';
import { SiteSeoChecksSummary } from './site-seo-checks';
import { useNavigate } from '@tanstack/react-router';
const quickLinks = [
	{
		label: __( 'Open Support Ticket', 'surerank' ),
		icon: <ticket classname="size-4"></ticket>,
		link: surerank_globals.support_link,
		external: true,
	},
	{
		label: __( 'Help Center', 'surerank' ),
		icon: <info classname="size-4"></info>,
		link: surerank_globals.help_link,
		external: true,
	},
	{
		label: __( 'Join our Community on Facebook', 'surerank' ),
		icon: <messagesquare classname="size-4"></messagesquare>,
		link: surerank_globals.community_link,
		external: true,
	},
	{
		label: __( 'Leave Us a Review', 'surerank' ),
		icon: <star classname="size-4"></star>,
		link: surerank_globals.rating_link,
		external: true,
	},
];

const onboardingSetup = [
	{
		label: __( 'Launch Setup Wizard', 'surerank' ),
		icon: <surerankmonologo classname="size-4"></surerankmonologo>,
		link: surerank_globals.wp_dashboard_url + '?page=surerank_onboarding',
		external: false,
	},
];

const quickAccessLinks =
	'yes' !== surerank_admin_common?.onboarding_complete_status
		? [ ...onboardingSetup, ...quickLinks ]
		: [ ...quickLinks ];

const SequencedThemesAndPlugins = dashboard_plugins_sequence
	.map( ( slug ) =&gt; themesAndPlugins.find( ( item ) =&gt; item.slug === slug ) )
	.filter( Boolean );

const Dashboard = () =&gt; {
	const navigate = useNavigate();
	const {
		fetchStatus,
		fetchInstalledPluginsAndThemes,
		handleInstallThemeOrPlugin,
		getProgressStatus,
		getPluginStatus,
	} = usePluginsAndThemes();

	useEffect( () =&gt; {
		checkForGCError();
		fetchInstalledPluginsAndThemes();
	}, [] );

	const getErrorMessages = ( errorCode ) =&gt; {
		switch ( String( errorCode ) ) {
			case '400':
				return __(
					'The request is malformed or invalid. Please check the request parameters and try again.',
					'surerank'
				);
			case '401':
				return __(
					'Authentication failed. Please provide valid credentials or re-authenticate.',
					'surerank'
				);
			case '403':
				return __(
					'Access is denied. You lack the necessary permissions to perform this action.',
					'surerank'
				);
			case '404':
				return __(
					'The requested resource was not found. Please verify the URL or resource ID.',
					'surerank'
				);
			case '429':
				return __(
					'You have exceeded your API quota. Please wait or upgrade your plan.',
					'surerank'
				);
			case '500':
				return __(
					`A server error occurred on Google's end. Please try again later.`,
					'surerank'
				);
			default:
				return __( 'An error occurred. Please try again.', 'surerank' );
		}
	};

	const checkForGCError = () =&gt; {
		const link = 'https://developers.google.com/webmaster-tools/v1/errors';

		const params = new URLSearchParams( window.location.search );
		const errorCode = params.get( 'gcp_error_code' );
		if ( ! errorCode ) {
			return;
		}
		const errorMessage = getErrorMessages( errorCode );

		const content = (
			</p><div>
				<p>{ errorMessage }</p>
				<p>
					{ __( 'Error code: ', 'surerank' ) }
					{ errorCode }
				</p>
				<a href="https://omii871.github.io/youtube/wp-content/plugins/surerank/src/apps/admin-dashboard/%7B" link target="_blank" rel="noopener noreferrer" classname="text-link-primary no-underline">
					{ __( 'Learn more', 'surerank' ) }
				</a>
			</div>
		);

		if ( errorMessage ) {
			toast.error( content, {
				dangerouslySetInnerHTML: true,
				autoDismiss: false,
			} );
		}

		//remove error code parameter and navigate directly to search-console
		const url = new URL( window.location.href );
		url.searchParams.delete( 'gcp_error_code' );
		url.searchParams.delete( 'action' );
		url.searchParams.delete( 'nonce' );
		url.searchParams.delete( 'status' );
		window.history.replaceState( {}, '', url.toString() );
		navigate( { to: '/search-console' } );
	};

	const renderInstallButtonText = useCallback(
		( item ) =&gt; {
			const status = getPluginStatus( item );
			switch ( status ) {
				case 'active':
					return __( 'Activated', 'surerank' );
				case 'activate':
					return __( 'Activate', 'surerank' );
				default:
					return __( 'Install &amp; Activate', 'surerank' );
			}
		},
		[ getPluginStatus ]
	);

	return (
		
			<container classname="h-full p-5 pb-8 xl:p-8 max-[1920px]:max-w-full mx-auto box-content bg-background-secondary gap-6" cols="{" containertype="grid" gap="2xl">
				<container.item classname="col-span-8">
					<container direction="column" classname="gap-8 relative">
						<siteseocheckssummary limit="{" showviewall="{" true></siteseocheckssummary>
					</container>
				</container.item>
				<container.item classname="col-span-4 flex flex-col gap-6">
					{ /* Plugins and Themes */ }
					<container classname="w-full h-fit bg-background-primary border-0.5 border-solid rounded-xl border-border-subtle p-3 shadow-sm" containertype="flex" direction="column" gap="xs">
						<container.item classname="md:w-full lg:w-full">
							<container align="center" classname="p-1" gap="xs" justify="between">
								<label classname="font-semibold text-text-primary">
									{ __( 'Extend Your Website', 'surerank' ) }
								</label>
							</container>
						</container.item>
						<container.item classname="md:w-full lg:w-full bg-field-primary-background rounded-lg">
							<container containertype="grid" classname="p-1 gap-1 grid-cols-1 min-[425px]:grid-cols-2 md:grid-cols-2 xl:grid-cols-2">
								{ SequencedThemesAndPlugins.map( ( item ) =&gt; (
									<plugincard key="{" item.name item="{" oninstall="{" handleinstallthemeorplugin fetchstatus="{" getpluginstatus="{" getprogressstatus="{" renderinstallbuttontext="{"></plugincard>
								) ) }
							</container>
						</container.item>
					</container>

					{ /* Quick Access */ }
					<container classname="w-full h-fit bg-background-primary border-0.5 border-solid rounded-xl border-border-subtle p-3 shadow-sm" containertype="flex" direction="column" gap="xs">
						<container.item classname="md:w-full lg:w-full p-1">
							<label classname="font-semibold text-text-primary">
								{ __( 'Quick Access', 'surerank' ) }
							</label>
						</container.item>
						<container.item classname="flex flex-col md:w-full lg:w-full bg-field-primary-background gap-1 p-1 rounded-lg">
							{ quickAccessLinks.map( ( link ) =&gt; (
								<div key="{" link.label classname="p-2 gap-1 items-center bg-background-primary rounded-md shadow-sm cursor-pointer" onclick="{"> {
										if ( link.external ) {
											window.open(
												link.link,
												'_blank',
												'noopener,noreferrer'
											);
										} else {
											window.location.href = link.link;
										}
									} }
								&gt;
									<container align="center" classname="gap-1 p-1" containertype="flex" direction="row">
										<container.item classname="flex">
											{ link.icon }
										</container.item>
										<container.item classname="flex">
											<label classname="py-0 px-1 font-normal cursor-pointer hover:text-link-primary">
												{ link.label }
											</label>
										</container.item>
									</container>
								</div>
							) ) }
						</container.item>
					</container>
				</container.item>
			</container>
		&gt;
	);
};

export default Dashboard;
</body></html>
