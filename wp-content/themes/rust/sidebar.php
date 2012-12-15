<div id="sidebar">
	<ul>
<?php if ( ! dynamic_sidebar( 'main-sidebar' ) ) : ?>
	
		<li>Stuff that happens if there is no sidebar set up.</li>

<?php endif; ?>
	</ul>
</div>