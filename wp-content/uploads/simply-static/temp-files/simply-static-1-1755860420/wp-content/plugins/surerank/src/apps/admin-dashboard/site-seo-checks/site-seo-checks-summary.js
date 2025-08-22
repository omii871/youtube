<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.0 Transitional//EN" "http://www.w3.org/TR/REC-html40/loose.dtd">
<html><body><p>import { Container, Title, Button } from '@bsf/force-ui';
import { __ } from '@wordpress/i18n';
import { Suspense } from '@wordpress/element';
import FixButton from '@GlobalComponents/fix-button';
import SiteSeoChecksTable from './site-seo-checks-table';
import SiteSeoChecksTableSkeleton, {
	SiteSeoChecksInnerTableSkeleton,
} from './site-seo-checks-table-skeleton';
import SiteSeoChecksDrawer from './site-seo-checks-drawer';
import { RefreshCw } from 'lucide-react';
import { useRunSeoChecks } from './use-run-seo-checks';
import { cn } from '@Functions/utils';

/**
 * Component for showing site SEO checks summary on dashboard
 *
 * @param {Object}  props             Component props
 * @param {number}  props.limit       Number of items to show (default: 5)
 * @param {boolean} props.showViewAll Whether to show view all button (default: true)
 * @return {JSX.Element} Site SEO checks summary component
 */
const SiteSeoChecksSummary = ( { limit = 5, showViewAll = true } ) =&gt; {
	const { isLoading, handleRunChecksAgain } = useRunSeoChecks();

	// Title section component
	const SiteSeoChecksTitle = () =&gt; {
		return (
			<container align="center" justify="between" classname="p-2">
				<title tag="h4" title="{" __ seo analysis size="md"></title>
				<button variant="primary" size="sm" icon="{" classname="{" cn isloading></button>
					}
					onClick={ handleRunChecksAgain }
					disabled={ isLoading } // Disable button while loading
				&gt;
					{ __( 'Re-run Checks', 'surerank' ) }
				
				<fixbutton size="sm" button_label="{" __ all for me></fixbutton>
			</container>
		);
	};

	// Component that uses suspense data
	const SiteSeoChecksContent = () =&gt; {
		if ( isLoading ) {
			return (
				
					<siteseocheckstitle></siteseocheckstitle>
					<siteseochecksinnertableskeleton></siteseochecksinnertableskeleton>
				&gt;
			);
		}

		return (
			
				<siteseocheckstitle></siteseocheckstitle>
				<siteseocheckstable limit="{" showviewall="{"></siteseocheckstable>
			&gt;
		);
	};

	return (
		</p><div classname="w-full space-y-2 rounded-xl bg-background-primary border-0.5 border-solid border-border-subtle p-4 shadow-sm">
			<suspense fallback="{"></suspense> }&gt;
				<siteseocheckscontent></siteseocheckscontent>
				<siteseochecksdrawer></siteseochecksdrawer>
			
		</div>
	);
};

export default SiteSeoChecksSummary;
</body></html>
