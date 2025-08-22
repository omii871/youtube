<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.0 Transitional//EN" "http://www.w3.org/TR/REC-html40/loose.dtd">
<html><body><p>import { STORE_NAME } from '@/admin-store/constants';
import { Breadcrumb, Button, Container, Title } from '@bsf/force-ui';
import { useDispatch, useSuspenseSelect, useSelect } from '@wordpress/data';
import { Suspense } from '@wordpress/element';
import { __ } from '@wordpress/i18n';
import { Home, RefreshCw } from 'lucide-react';
import SiteSeoChecksTableSkeleton, {
	SiteSeoChecksInnerTableSkeleton,
} from './site-seo-checks-table-skeleton';
import FixButton from '@GlobalComponents/fix-button';
import SiteSeoChecksTable from './site-seo-checks-table';
import SiteSeoChecksDrawer from './site-seo-checks-drawer';
import { createLazyRoute } from '@tanstack/react-router';
import { useRunSeoChecks } from './use-run-seo-checks';
import { cn } from '@Functions/utils';

// Non-suspense version of the hook for components outside Suspense boundary
export const useSiteSeoAnalysis = () =&gt; {
	const state = useSelect(
		( select ) =&gt;
			select( STORE_NAME ).getSiteSeoAnalysis() || {
				searchKeyword: '',
				report: [],
			}
	);
	const dispatch = useDispatch( STORE_NAME )?.setSiteSeoAnalysis;

	return [ state, dispatch ];
};

// Suspense version of the hook for components inside Suspense boundary
export const useSuspenseSiteSeoAnalysis = () =&gt; {
	const state = useSuspenseSelect( ( select ) =&gt;
		select( STORE_NAME ).getSiteSeoAnalysis()
	);
	const dispatch = useDispatch( STORE_NAME )?.setSiteSeoAnalysis;

	return [ state, dispatch ];
};

// Header component with breadcrumb and search
const SiteSeoChecksHeader = () =&gt; {
	return (
		<container justify="between" align="center">
			<breadcrumb size="md">
				<breadcrumb.list>
					<breadcrumb.item>
						<breadcrumb.link href="#/dashboard" classname="flex items-center gap-2 hover:no-underline">
							<home classname="size-4 text-text-primary"></home>
							{ __( 'Dashboard', 'surerank' ) }
						</breadcrumb.link>
					</breadcrumb.item>
					<breadcrumb.separator type="slash"></breadcrumb.separator>
					<breadcrumb.item>
						<breadcrumb.page>
							{ __( 'Site SEO Analysis', 'surerank' ) }
						</breadcrumb.page>
					</breadcrumb.item>
				</breadcrumb.list>
			</breadcrumb>
		</container>
	);
};

// Title section component
const SiteSeoChecksTitle = ( { isLoading, handleRunChecksAgain } ) =&gt; {
	return (
		<container align="center" justify="between" classname="p-2">
			<title tag="h4" title="{" __ seo analysis size="md"></title>
			<div></div>
			<button variant="primary" size="sm" icon="{" classname="{" cn isloading></button>
				}
				onClick={ handleRunChecksAgain }
				disabled={ isLoading }
			&gt;
				{ __( 'Re-run Checks', 'surerank' ) }
			
			<fixbutton size="sm" button_label="{" __ fix all for me></fixbutton>
		</container>
	);
};

// Component that uses suspense data
const SiteSeoChecksContent = () =&gt; {
	const { isLoading, handleRunChecksAgain } = useRunSeoChecks();

	// Show skeleton while API calls are loading
	if ( isLoading ) {
		return (
			</p><div classname="w-full space-y-2 rounded-xl bg-background-primary border-0.5 border-solid border-border-subtle p-4 shadow-sm">
				<siteseocheckstitle isloading="{" handlerunchecksagain="{"></siteseocheckstitle>
				<siteseochecksinnertableskeleton></siteseochecksinnertableskeleton>
			</div>
		);
	}

	return (
		<div classname="w-full space-y-2 rounded-xl bg-background-primary border-0.5 border-solid border-border-subtle p-4 shadow-sm">
			<siteseocheckstitle isloading="{" handlerunchecksagain="{"></siteseocheckstitle>
			<siteseocheckstable></siteseocheckstable>
		</div>
	);
};

// Combined component for Suspense-enabled content
const SuspendedContent = () =&gt; {
	return (
		<suspense fallback="{"></suspense> }&gt;
			<siteseocheckscontent></siteseocheckscontent>
			<siteseochecksdrawer></siteseochecksdrawer>
		
	);
};

// Main component
const SiteSeoChecks = () =&gt; {
	return (
		<div classname="w-full p-5 pb-8 xl:p-8 max-[1920px]:max-w-full mx-auto space-y-8">
			<siteseochecksheader></siteseochecksheader>
			<suspendedcontent></suspendedcontent>
		</div>
	);
};

export const LazyRoute = createLazyRoute( '/site-seo-analysis' )( {
	component: SiteSeoChecks,
} );

export default SiteSeoChecks;
</body></html>
