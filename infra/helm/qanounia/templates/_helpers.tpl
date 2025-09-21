{{- define "qanounia.fullname" -}}
{{- if .Chart.Name -}}
{{ printf "%s" .Chart.Name }}
{{- else -}}
qanounia
{{- end -}}
{{- end -}}
