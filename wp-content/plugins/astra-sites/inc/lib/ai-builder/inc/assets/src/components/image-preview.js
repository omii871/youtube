<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.0 Transitional//EN" "http://www.w3.org/TR/REC-html40/loose.dtd">
<html><body><p>import { motion } from 'framer-motion';
import { CheckIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { memo } from '@wordpress/element';
import { classNames } from '../helpers';
import Tile from './tile';

const VARIANTS = {
	default: 'default',
	selection: 'selection',
};

const ImagePreview = ( {
	image,
	isSelected,
	onClick,
	variant = 'default',
	...props
} ) =&gt; {
	const handleSelection = ( imageItem ) =&gt; ( event ) =&gt; {
		event?.preventDefault();
		event?.stopPropagation();

		if ( variant === VARIANTS.selection &amp;&amp; isSelected ) {
			return;
		}

		onClick( imageItem );
	};

	const handleRemoveSelection = ( imageItem ) =&gt; ( event ) =&gt; {
		event?.preventDefault();
		event?.stopPropagation();

		onClick( imageItem );
	};

	const renderSelectionIcon = () =&gt; {
		if ( ! isSelected ) {
			return null;
		}

		if ( variant === VARIANTS.selection ) {
			return (
				</p><div onclick="{" handleremoveselection image classname="flex items-center justify-center absolute top-2 right-2 p-1 bg-white rounded-full border border-solid border-zip-dark-theme-border cursor-pointer">
					<xmarkicon classname="w-4 h-4 text-zip-app-heading"></xmarkicon>
				</div>
			);
		}

		return (
			<div classname="inline-flex absolute top-2 right-2 p-1 bg-outline-color rounded-full pointer-events-none">
				<checkicon classname="w-4 h-4 text-white"></checkicon>
			</div>
		);
	};

	return (
		<motion.div key="{" image.id initial="{" opacity: animate="{" transition="{" duration: exit="{" ...props>
			<tile classname="{" classnames relative overflow-hidden rounded-lg border-2 border-solid border-transparent variant="==" variants.default isselected onclick="{" handleselection image>
				<img classname="inline-block w-full h-fit relative aspect-[12/8] bg-background-secondary" src="https://omii871.github.io/youtube/wp-content/plugins/astra-sites/inc/lib/ai-builder/inc/assets/src/components/%7B" image.optimized_url alt="{" image loading="lazy" onload="{" event> {
						event.target.classList.remove( 'aspect-[12/8]' );
					} }
				/&gt;
				{ renderSelectionIcon() }
			</tile>
			{ image?.author_name &amp;&amp; (
				<a href="https://omii871.github.io/youtube/wp-content/plugins/astra-sites/inc/lib/ai-builder/inc/assets/src/components/%7B" image target="_blank" classname="block w-11/12 mt-1 mx-1 text-[0.625rem] font-normal leading-3 !text-secondary-text no-underline" rel="noreferrer">
					by { image.author_name } via{ ' ' }
					{ image.engine
						? image.engine.charAt( 0 ).toUpperCase() +
						  image.engine.slice( 1 )
						: 'Default' }
				</a>
			) }
		</motion.div>
	);
};

export default memo( ImagePreview, ( prevProps, nextProp ) =&gt; {
	return (
		String( prevProps.image.id ) === String( nextProp.image.id ) &amp;&amp;
		prevProps.isSelected === nextProp.isSelected &amp;&amp;
		prevProps.onClick === nextProp.onClick &amp;&amp;
		prevProps.variant === nextProp.variant
	);
} );
</body></html>
