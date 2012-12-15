<?php
class Columnizer {
	
	private $defaults;
	public $input_data;
	public $multiAR;
	private $args;
	private $num_items;
	public $num_rows;
	public $num_cols;
	private $remainder;
	
	public $k;
				
	public function __construct($in){
	
		$this->defaults = array(			
			'sort_order'		=> 'ASC',
			'sort_by'			=> 'none',
			'sort_direction'	=> 'vert',
			'hide_empty'		=> true,
			'num_cols'			=> 2,
			'num_rows'			=> 0,
			'markup'			=> array(
				'outer_wrap'		=> 'div',
				'col'				=> 'ul',
				'row'				=> 'li'
			)
		);
		
		
		if( is_array( $in ) ) {
		
			if( isset($in['args']) && $in['input_data']){
				if( is_array($in['args']) && is_array($in['input_data']) ){
					$this->input_data = $in['input_data'];
					$this->args = array_merge( $this->defaults, $in['args'] );
				}
			}else{
				$this->input_data = $in;
				$this->args = array_merge( $this->defaults, $in );
			}

		} else {
			die('This class requires an array as an argument.');
		}
		
		$this->calculate_rowscols();
		
		$this->convert_multi_array($this->input_data);
		
		$this->multiAR = $this->convert_multi_array($this->input_data);
		echo "<br /><p>Multi Array:</p>";
		echo "<pre>";
		var_dump($this->multiAR);
		echo "</pre>";
		
	}
	
	public function the_columns( $echo = true ){
		
		$t = 0;
		$output = '';
		$this->sort_items();
		
		/* Column Wraper Start */
		if($this->args['markup'] != 'table')
			$output = "<{$this->args['markup']['outer_wrap']} class='columnizer-columns-wrap cols-{$this->num_cols} rows-{$this->num_rows}'>";
		else
			$output = "<table class='columnizer-columns-wrap cols-{$this->num_cols} rows-{$this->num_rows}'><tbody>";
		
		if($this->args['markup'] != 'table'){
			
			for($c=0;$c<$this->num_cols;$c++){
				
				$output .= "<{$this->args['markup']['col']} class='column col-$c' >";
					for($r=0; $r<$this->num_rows; $r++) {
						$item = $this->multiAR[$c][$r];
						if($item == null && $this->args['hide_empty']){
							//do nothing
						}elseif($item == null){
							$output .= "<{$this->args['markup']['row']} class='item row-$r empty' >";
							$output .= "</{$this->args['markup']['row']}>";
						}else{
							$output .= "<{$this->args['markup']['row']} class='item row-$r' >";
							$output .= $item;
							$output .= "</{$this->args['markup']['row']}>";
						}
					}
				
				
				/*
				for($c=0;$c<$this->num_rows;$c++){
					if($this->remainder != 0){
						if($this->args['num_rows'] == 0 && $this->num_rows-1==$c && $i >= $this->remainder){
							if($this->args['hide_empty']){
								//do nothing
							}else{
								$output .= "<{$this->args['markup']['row']} class='item row-$c empty' >";
								$output .= "</{$this->args['markup']['row']}>";
							}
						}elseif($this->args['num_cols'] == 0 && $this->num_cols-1==$i && $c >= $this->remainder){
							if($this->args['hide_empty']){
								//do nothing
							}else{
								$output .= "<{$this->args['markup']['row']} class='item row-$c empty' >";
								$output .= "</{$this->args['markup']['row']}>";
							}
						}else{
							if($this->num_items == $t && $this->args['hide_empty']){
								//do nothing
							}else{
								$output .= "<{$this->args['markup']['row']} class='item row-$c' >";
								$output .= $this->input_data[$t];
								$output .= "</{$this->args['markup']['row']}>";
								$t++;
							}
						}
					}else{
						if($this->num_items == $t && $this->args['hide_empty']){
							//do nothing
						}else{
							$output .= "<{$this->args['markup']['row']} class='item row-$c' >";
							$output .= $this->input_data[$t];
							$output .= "</{$this->args['markup']['row']}>";
							$t++;
						}
					}
				}
				*/
				$output .= "</{$this->args['markup']['col']}>";
				
			}
			
		}
			
		/* Column Wraper End */
		if($this->args['markup'] != 'table')
			$output .= "</{$this->args['markup']['outer_wrap']}>";
		else
			$output .= "</tbody></table>";

		if($echo)
			echo $output;
		else
			return $output;
		
	}
	
	private function sort_items(){
		if($this->args['sort_by'] == 'none'){
			//Don't Sort
		}elseif($this->args['sort_by'] == 'numeric'){
			sort($this->input_data, SORT_NUMERIC);
		}elseif($this->args['sort_by'] == 'alpha'){
			sort($this->input_data, SORT_STRING);
		}else{
			sort($this->input_data);
		}
		
		if($this->args['sort_direction'] == 'horz'){
			$this->sort_horz_columns();
		}
		
	}
	
	public function sort_horz_columns(){
		$t = 0;
		for($c=0; $c<$this->num_cols; $c++) {
			for($r=0; $r<$this->num_rows; $r++) {
				
				$multiAR[$r][$c] = $this->multiAR[$c][$r];
				$t++;
			}
		}
		$this->multiAR = $multiAR;
	}
	
	public function convert_multi_array($data){
		$t = 0;
		$multiAr = array();
		for($c=0; $c<$this->num_cols; $c++) {
			for($r=0; $r<$this->num_rows; $r++) {
				$multiAr[$c][$r] = $data[$t];
				$t++;
			}
		}
		return $multiAr;
	}
	
	private function calculate_rowscols(){
		$this->num_items = count($this->input_data);
		if($this->args['num_cols'] == 0 && $this->args['num_rows'] == 0)
			return false;
		else {
			if($this->args['num_rows'] == 0){
				$this->num_rows = ceil( $this->num_items / $this->args['num_cols'] );
				$this->num_cols = $this->args['num_cols'];
				$this->remainder = $this->num_items%$this->num_cols;
			}else {
				$this->num_cols = ceil( $this->num_items / $this->args['num_rows'] );
				$this->num_rows = $this->args['num_rows'];
				$this->remainder = $this->num_items%$this->num_rows;
			}
		}
	}
} 
?>
<!DOCTYPE HTML>
<html>
<head><title>Columnizer</title>
<style>
.column {
	float:left;
	margin-right:20px;
}
</style>
</head>
<body>
<?php 
$original_array = range('0', '7');

$input =  array(
	'input_data'	=> $original_array,
	'args'		=> array(
		'num_rows'			=> 0,
		'num_cols'			=> 3,
		'sort_by'			=> 'none',
		'sort_direction'	=> 'vert',
		'hide_empty'		=> false,
		'markup'			=> array(
			'outer_wrap'		=> 'div',
			'col'				=> 'ul',
			'row'				=> 'li'
		)
	)
);
$cols = new Columnizer($input);

?>
</body>
</html>