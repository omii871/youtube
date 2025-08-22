<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.0 Transitional//EN" "http://www.w3.org/TR/REC-html40/loose.dtd">
<html><body><p>import { createLazyRoute } from '@tanstack/react-router';
import { Container, Title, Select, Tabs, Input, Text } from '@bsf/force-ui';
import ContentAnalysisTable from '../content-analysis-table';
import { __ } from '@wordpress/i18n';
import { useState, useEffect } from '@wordpress/element';
import { Search } from 'lucide-react';
import {
	getCurrentBreadcrumb,
	useBreadcrumb,
} from '@/apps/admin-components/dashboard-breadcrumb';
import { cn } from '@/functions/utils';
import EmptyContentGap from '../empty-content-gap';
const ContentAnalysis = () =&gt; {
	const [ searchQuery, setSearchQuery ] = useState( '' );
	const [ statusFilter, setStatusFilter ] = useState( 'All' );
	const breadcrumbs = useBreadcrumb(); // Get breadcrumb data
	const [ activeTab, setActiveTab ] = useState( 'analysis' );
	const CONTENT_PERFORMANCE_TABS = {
		analysis: {
			label: __( 'Content Analysis', 'surerank' ),
		},
		gap: {
			label: __( 'Content Gap', 'surerank' ),
		},
	};

	useEffect( () =&gt; {
		window.scrollTo( { top: 0, behavior: 'smooth' } );
	}, [] );

	return (
		<container classname="h-full p-5 pb-8 xl:p-8 max-[1920px]:max-w-full mx-auto box-content bg-background-secondary" cols="{" containertype="grid" gap="2xl">
			<container direction="row" classname="gap-2 col-span-12 rounded-xl justify-between">
				<container.item classname="mt-1">
					{ getCurrentBreadcrumb( breadcrumbs ) }
				</container.item>
				<container.item classname="w-full max-w-[18.75rem]">
					<input aria-label="{" __ by url or title id="search-by-url-or-title" prefix="{"> }
						role="search"
						value={ searchQuery }
						size="sm"
						type="search"
						onChange={ ( value ) =&gt; setSearchQuery( value ) }
						placeholder={ __( 'Search', 'surerank' ) }
					/&gt;
				</container.item>
			</container>
			<container direction="column" classname="gap-2 col-span-12 p-4 bg-background-primary rounded-xl shadow-sm border-0.5 border-solid border-border-subtle">
				<container.item classname="flex items-center">
					<container align="center" classname="gap-2 w-full" justify="between">
						<container.item classname="pl-2">
							<container align="center" classname="gap-2">
								<title title="{" __ performance size="md" tag="h4"></title>
								<text size="{" weight="{" color="secondary">
									{ __( '(Last 90 days)', 'surerank' ) }
								</text>
							</container>
						</container.item>
						<container.item classname="flex items-center gap-2 py-2">
							<div classname="w-48">
								<select onchange="{" value>
										setStatusFilter( value )
									}
									size="md"
									value={ statusFilter }
									className="w-[250px]"
								&gt;
									<select.button placeholder="{" __></select.button>
									<select.portal id="surerank-root">
										<select.options>
											<select.option value="All">
												{ __( 'All', 'surerank' ) }
											</select.option>
											<select.option value="Top Ranked">
												{ __(
													'Top Ranked',
													'surerank'
												) }
											</select.option>
											<select.option value="On the Rise">
												{ __(
													'On the Rise',
													'surerank'
												) }
											</select.option>
											<select.option value="Low Visibility">
												{ __(
													'Low Visibility',
													'surerank'
												) }
											</select.option>
										</select.options>
									</select.portal>
								</select>
							</div>
							<tabs.group activeitem="{" activetab onchange="{" value: slug>
									setActiveTab( slug )
								}
								size="sm"
								variant="rounded"
							&gt;
								{ Object.entries(
									CONTENT_PERFORMANCE_TABS
								).map( ( [ key, tab ] ) =&gt; (
									<tabs.tab key="{" slug="{" text="{" tab.label classname="{" cn text-nowrap space-x-1.5 activetab="==" hover:text-brand-800 badge="{" null disabled tab.disabled></tabs.tab>
								) ) }
							</tabs.group>
						</container.item>
					</container>
				</container.item>

				<tabs activeitem="{" activetab>
					<tabs.panel slug="analysis">
						<contentanalysistable type="full" searchquery="{" statusfilter="{"></contentanalysistable>
					</tabs.panel>
					<tabs.panel slug="gap">
						<emptycontentgap rows="{" overlayfixed="{" true></emptycontentgap>
					</tabs.panel>
				</tabs>
			</container>
		</container>
	);
};

export const LazyRoute = createLazyRoute( '/content-performance' )( {
	component: ContentAnalysis,
} );

export default ContentAnalysis;
</p></body></html>
