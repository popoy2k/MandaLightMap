#!/bin/bash

usage() { echo "Usage: $0 [-y 2012-2019] [-m 01-12] [-n filename]" 1>&2; exit 1; }

while getopts ":m:n:y:" o; do
    case "${o}" in
        y)
            y=${OPTARG}
            ;;
        m)
            m=${OPTARG}
            ;;
        n) 
            n=${OPTARG}
            ;;
        *)
            usage
            ;;
    esac
done
shift $((OPTIND-1))


if [ ! -z "${y}" ] && [ ! -z "${m}" ] && [ ! -z "${n}" ]; then
     psql -h localhost -U carl -d CarlPostGIS -c "DROP TABLE public.viirs_${y}_${m};"
     echo "[-] Table 'public.viirs_${y}_${m}' has been dropped."
     rm ${n}.avg_rade9h.tif
     echo "[-] File ${n} has been deleted."
    exit 0;
fi

usage
