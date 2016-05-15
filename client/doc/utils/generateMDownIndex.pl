#
# Script perl di generazione indice per file markdown.
#
#  Lo script esegue il parsing di un file con sintassi markdown, alla ricerca di
# tutti i sezionamenti di ogni livello, inizianti con il carattere "#".
#
# Viene generata una nuova sezione, del tipo:
#
# # Table of contents
#
# 
#
#

use strict;
use warnings;

# Esco nel caso in cui non sia stato passato un parametro
die "Usage: $0 FILENAME \n" if not @ARGV;

my $file = $1 ;

open my $fh, '<:encoding(UTF-8)', $file or die;
while ( my $line = <$fh> ) {
    if ( $line =~ /^#/ ){
        print "|-- chapter found!"
    }
}

exit 0;

#foreach my $file (@ARGV) {
#    open my $fh, '<:encoding(UTF-8)', $file or die;
#    while (my $line = <$fh>) {
#        if ($line =~ /REGEX/) {
#            print $line;
#        }
#    }
#}
