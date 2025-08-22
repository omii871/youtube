<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.0 Transitional//EN" "http://www.w3.org/TR/REC-html40/loose.dtd">
<html><body><p>import { Container, Table, Skeleton } from '@bsf/force-ui';

const SiteSeoChecksTableSkeleton = () =&gt; {
	return (
		</p><div classname="w-full space-y-2 rounded-xl bg-background-primary shadow-sm">
			<container align="center" justify="between" classname="p-2">
				<skeleton classname="h-6 w-48"></skeleton>
				<skeleton classname="h-8 w-32"></skeleton>
			</container>
			<siteseochecksinnertableskeleton></siteseochecksinnertableskeleton>
		</div>
	);
};

export default SiteSeoChecksTableSkeleton;

const SiteSeoChecksInnerTableSkeleton = () =&gt; {
	return (
		<table>
			<table.head>
				<table.headcell>
					<skeleton classname="h-4 w-32"></skeleton>
				</table.headcell>
				<table.headcell classname="w-52 text-center">
					<skeleton classname="h-4 w-24 mx-auto"></skeleton>
				</table.headcell>
			</table.head>
			<table.body>
				{ Array.from( { length: 10 } ).map( ( _, index ) =&gt; (
					<table.row key="{" index>
						<table.cell>
							<container gap="xl" align="center">
								<container.item>
									<skeleton classname="h-6 w-16"></skeleton>
								</container.item>
								<container.item>
									<skeleton classname="h-4 w-64"></skeleton>
								</container.item>
							</container>
						</table.cell>
						<table.cell>
							<container gap="sm">
								<skeleton classname="h-6 w-24"></skeleton>
								<skeleton classname="h-6 w-16"></skeleton>
							</container>
						</table.cell>
					</table.row>
				) ) }
			</table.body>
			<table.footer>
				<container align="center" justify="between">
					<skeleton classname="h-4 w-32"></skeleton>
					<container gap="sm">
						<skeleton classname="h-8 w-8"></skeleton>
						<skeleton classname="h-8 w-8"></skeleton>
						<skeleton classname="h-8 w-8"></skeleton>
						<skeleton classname="h-8 w-8"></skeleton>
						<skeleton classname="h-8 w-8"></skeleton>
					</container>
				</container>
			</table.footer>
		</table>
	);
};

export { SiteSeoChecksInnerTableSkeleton };
</body></html>
