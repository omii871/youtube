<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.0 Transitional//EN" "http://www.w3.org/TR/REC-html40/loose.dtd">
<html><body><p>import { isEqualQueryParamValue } from '@/functions/utils';
import { SureRankLogo } from '@/global/components/icons';
import { Link } from '@tanstack/react-router';
import { useMemo } from '@wordpress/element';
import { __ } from '@wordpress/i18n';

const Logo = () =&gt; {
	const linkClassName =
		'inline-flex no-underline hover:no-underline focus:no-underline focus:[box-shadow:none] cursor-pointer';
	const renderLogo = useMemo( () =&gt; <sureranklogo classname="size-6"></sureranklogo>, [] );

	return isEqualQueryParamValue( 'page', 'surerank_settings' ) ? (
		<a href="https://omii871.github.io/youtube/wp-content/plugins/surerank/src/apps/admin-components/%7B" surerank_globals.wp_dashboard_url classname="{" linkclassname aria-label="{" __ dashboard>
			{ renderLogo }
		</a>
	) : (
		<link to="/dashboard" classname="{" linkclassname aria-label="{" __ dashboard>
			{ renderLogo }
		
	);
};

export default Logo;
</p></body></html>
